import { defaultProducts, defaultClients } from './types';

let inMemoryProducts = defaultProducts.map(p => ({ ...p }));
let inMemoryClients = defaultClients.map(c => ({ ...c }));
let inMemoryFavorites = [];
let inMemoryOrders = [];
let inMemoryOrderItems = [];
let inMemoryCart = [];

export async function migrateDbIfNeeded(db) {
  if (!db) {
    console.log('Mode memoire actif (db null)');
    return;
  }
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS produit (id INTEGER PRIMARY KEY AUTOINCREMENT, nom TEXT, description TEXT, prix REAL, image TEXT);
    CREATE TABLE IF NOT EXISTS client (id INTEGER PRIMARY KEY AUTOINCREMENT, nom TEXT UNIQUE, mdp TEXT, admin INTEGER, adresse TEXT, langue TEXT);
    CREATE TABLE IF NOT EXISTS favori (id INTEGER PRIMARY KEY AUTOINCREMENT, client_nom TEXT, produit_id INTEGER);
    CREATE TABLE IF NOT EXISTS commande (id INTEGER PRIMARY KEY AUTOINCREMENT, client_nom TEXT, date TEXT, total REAL);
CREATE TABLE IF NOT EXISTS commande_item (id INTEGER PRIMARY KEY AUTOINCREMENT, commande_id INTEGER, produit_nom TEXT, produit_prix REAL, quantite INTEGER, produit_image TEXT);
CREATE TABLE IF NOT EXISTS panier (id INTEGER PRIMARY KEY AUTOINCREMENT, client_nom TEXT, produit_id INTEGER, quantite INTEGER);
`);
  const productCount = await db.getFirstAsync('SELECT COUNT(*) as count FROM produit');
  if (productCount.count === 0) {
    for (const p of defaultProducts) {
      await db.runAsync(
        'INSERT INTO produit (nom, description, prix, image) VALUES (?, ?, ?, ?)',
        p.nom, p.description, p.prix, p.image
      );
    }
  }
  const clientCount = await db.getFirstAsync('SELECT COUNT(*) as count FROM client');
  if (clientCount.count === 0) {
    for (const c of defaultClients) {
      await db.runAsync(
        'INSERT INTO client (nom, mdp, admin, adresse, langue) VALUES (?, ?, ?, ?, ?)',
        c.nom, c.mdp, c.admin, c.adresse, c.langue
      );
    }
  }
}

// ----- Produit -----
export async function getAllProducts(db) {
  if (!db) return [...inMemoryProducts];
  return await db.getAllAsync('SELECT * FROM produit');
}

export async function addProductDB(db, product) {
  if (!db) {
    const newId = Math.max(...inMemoryProducts.map(p => p.id), 0) + 1;
    inMemoryProducts.push({ id: newId, ...product });
    return newId;
  }
  const result = await db.runAsync(
    'INSERT INTO produit (nom, description, prix, image) VALUES (?, ?, ?, ?)',
    product.nom, product.description, product.prix, product.image
  );
  return result.lastInsertRowId;
}

export async function deleteProductDB(db, id) {
  if (!db) {
    inMemoryProducts = inMemoryProducts.filter(p => p.id !== id);
    return true;
  }
  await db.runAsync('DELETE FROM produit WHERE id = ?', id);
  return true;
}

export async function resetProductsDB(db) {
  if (!db) {
    inMemoryProducts = defaultProducts.map(p => ({ ...p }));
    return;
  }
  await db.runAsync('DELETE FROM produit');
  for (const p of defaultProducts) {
    await db.runAsync(
      'INSERT INTO produit (nom, description, prix, image) VALUES (?, ?, ?, ?)',
      p.nom, p.description, p.prix, p.image
    );
  }
}

// ----- Clients -----
export async function getClientByNom(db, nom) {
  if (!db) return inMemoryClients.find(c => c.nom === nom) || null;
  return await db.getFirstAsync('SELECT * FROM client WHERE nom = ?', nom);
}

export async function updateClientLangue(db, nom, langue) {
  if (!db) {
    inMemoryClients = inMemoryClients.map(c => c.nom === nom ? { ...c, langue } : c);
    return true;
  }
  await db.runAsync('UPDATE client SET langue = ? WHERE nom = ?', langue, nom);
  return true;
}

export async function updateClientAdresse(db, nom, adresse) {
  if (!db) {
    inMemoryClients = inMemoryClients.map(c => c.nom === nom ? { ...c, adresse } : c);
    return true;
  }
  await db.runAsync('UPDATE client SET adresse = ? WHERE nom = ?', adresse, nom);
  return true;
}

export async function updateClientMdp(db, nom, mdp) {
  if (!db) {
    inMemoryClients = inMemoryClients.map(c => c.nom === nom ? { ...c, mdp } : c);
    return true;
  }
  await db.runAsync('UPDATE client SET mdp = ? WHERE nom = ?', mdp, nom);
  return true;
}

export async function resetAllPasswords(db) {
  if (!db) {
    inMemoryClients = inMemoryClients.map(c => ({ ...c, mdp: 'mdp123' }));
    return;
  }
  await db.runAsync("UPDATE client SET mdp = 'mdp123'");
}

// ----- Favoris -----
export async function getFavorites(db, clientNom) {
  if (!db) return inMemoryFavorites.filter(f => f.client_nom === clientNom).map(f => f.produit_id);
  const rows = await db.getAllAsync('SELECT produit_id FROM favori WHERE client_nom = ?', clientNom);
  return rows.map(r => r.produit_id.toString());
}

export async function addFavorite(db, clientNom, produitId) {
  if (!db) {
    if (!inMemoryFavorites.some(f => f.client_nom === clientNom && f.produit_id === produitId)) {
      inMemoryFavorites.push({ client_nom: clientNom, produit_id: produitId });
    }
    return true;
  }
  await db.runAsync(
    'INSERT INTO favori (client_nom, produit_id) VALUES (?, ?)',
    clientNom, produitId
  );
  return true;
}

export async function removeFavorite(db, clientNom, produitId) {
  if (!db) {
    inMemoryFavorites = inMemoryFavorites.filter(
      f => !(f.client_nom === clientNom && f.produit_id === produitId)
    );
    return true;
  }
  await db.runAsync(
    'DELETE FROM favori WHERE client_nom = ? AND produit_id = ?',
    clientNom, produitId
  );
  return true;
}

// ----- Commandes -----
export async function addOrder(db, clientNom, date, total, items) {
  if (!db) {
    const newOrderId = inMemoryOrders.length > 0 ? Math.max(...inMemoryOrders.map(o => o.id)) + 1 : 1;
    inMemoryOrders.push({ id: newOrderId, client_nom: clientNom, date, total });
    items.forEach((item) => {
      inMemoryOrderItems.push({
        id: inMemoryOrderItems.length + 1,
        commande_id: newOrderId,
        produit_nom: item.name,
        produit_prix: item.price,
        quantite: item.quantity,
        produit_image: item.image,
      });
    });
    return newOrderId;
  }
  const result = await db.runAsync(
    'INSERT INTO commande (client_nom, date, total) VALUES (?, ?, ?)',
    clientNom, date, total
  );
  const orderId = result.lastInsertRowId;
  for (const item of items) {
    await db.runAsync(
      'INSERT INTO commande_item (commande_id, produit_nom, produit_prix, quantite, produit_image) VALUES (?, ?, ?, ?, ?)',
      orderId, item.name, item.price, item.quantity, item.image
    );
  }
  return orderId;
}

export async function getOrders(db, clientNom) {
  if (!db) {
    return inMemoryOrders
      .filter(o => o.client_nom === clientNom)
      .map(o => ({
        id: o.id,
        date: o.date,
        total: o.total,
        items: inMemoryOrderItems.filter(i => i.commande_id === o.id),
      }));
  }
  const orders = await db.getAllAsync('SELECT * FROM commande WHERE client_nom = ?', clientNom);
  const result = [];
  for (const o of orders) {
    const items = await db.getAllAsync('SELECT * FROM commande_item WHERE commande_id = ?', o.id);
    result.push({
      id: o.id,
      date: o.date,
      total: o.total,
      items,
    });
  }
  return result;
}

// ----- Panier -----
export async function getCartDB(db, clientNom) {
  if (!db) {
    return inMemoryCart.filter(c => c.client_nom === clientNom);
  }
  return await db.getAllAsync('SELECT * FROM panier WHERE client_nom = ?', clientNom);
}

export async function addToCartDB(db, clientNom, produitId) {
  if (!db) {
    const existing = inMemoryCart.find(c => c.client_nom === clientNom && c.produit_id === produitId);
    if (existing) {
      existing.quantite += 1;
    } else {
      inMemoryCart.push({ client_nom: clientNom, produit_id: produitId, quantite: 1 });
    }
    return true;
  }
  const existing = await db.getFirstAsync(
    'SELECT * FROM panier WHERE client_nom = ? AND produit_id = ?',
    clientNom, produitId
  );
  if (existing) {
    await db.runAsync(
      'UPDATE panier SET quantite = quantite + 1 WHERE client_nom = ? AND produit_id = ?',
      clientNom, produitId
    );
  } else {
    await db.runAsync(
      'INSERT INTO panier (client_nom, produit_id, quantite) VALUES (?, ?, 1)',
      clientNom, produitId
    );
  }
  return true;
}

export async function updateCartQtyDB(db, clientNom, produitId, quantite) {
  if (!db) {
    const existing = inMemoryCart.find(c => c.client_nom === clientNom && c.produit_id === produitId);
    if (existing) {
      if (quantite <= 0) {
        inMemoryCart = inMemoryCart.filter(c => !(c.client_nom === clientNom && c.produit_id === produitId));
      } else {
        existing.quantite = quantite;
      }
    }
    return true;
  }
  if (quantite <= 0) {
    await db.runAsync(
      'DELETE FROM panier WHERE client_nom = ? AND produit_id = ?',
      clientNom, produitId
    );
  } else {
    await db.runAsync(
      'UPDATE panier SET quantite = ? WHERE client_nom = ? AND produit_id = ?',
      quantite, clientNom, produitId
    );
  }
  return true;
}

export async function removeFromCartDB(db, clientNom, produitId) {
  if (!db) {
    inMemoryCart = inMemoryCart.filter(c => !(c.client_nom === clientNom && c.produit_id === produitId));
    return true;
  }
  await db.runAsync(
    'DELETE FROM panier WHERE client_nom = ? AND produit_id = ?',
    clientNom, produitId
  );
  return true;
}

export async function clearCartDB(db, clientNom) {
  if (!db) {
    inMemoryCart = inMemoryCart.filter(c => c.client_nom !== clientNom);
    return;
  }
  await db.runAsync('DELETE FROM panier WHERE client_nom = ?', clientNom);
}
