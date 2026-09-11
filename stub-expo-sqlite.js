/**
 * Mock minimal de expo-sqlite pour le développement web.
 * Simule une base SQLite en mémoire avec les tables nécessaires au projet.
 * Compatible avec les méthodes : getAllAsync, getFirstAsync, runAsync, execAsync.
 */
import { defaultProducts, defaultClients } from '@/database/types';

let produits = defaultProducts.map(p => ({
  id: p.id,
  nom: p.nom,
  description: p.description,
  prix: p.prix,
  image: p.image
}));

let clients = defaultClients.map(c => ({
  id: c.id,
  nom: c.nom,
  mdp: c.mdp,
  admin: c.admin || 0,
  adresse: c.adresse,
  langue: c.langue
}));

let favoris = [];
let commandes = [];
let commande_items = [];

let ids = {
  produit: 8,
  client: 4,
  favori: 1,
  commande: 1,
  commande_item: 1
};

function matchQuery(query, table) {
  const cleaned = query.toLowerCase().trim().replace(/\s+/g, ' ');
  return cleaned.includes(table.toLowerCase());
}

function execAsync(statements) {
  return Promise.resolve();
}

function getAllAsync(query, ...params) {
  const q = query.toLowerCase().trim().replace(/\s+/g, ' ');

  if (q.includes('from produit')) {
    return Promise.resolve(
      produits
        .map(p => p)
        .sort((a, b) => a.id - b.id)
    );
  }

  if (q.includes('from client')) {
    if (q.includes('where nom = ?')) {
      return Promise.resolve(clients.filter(c => c.nom === params[0]));
    }
    return Promise.resolve(clients);
  }

  if (q.includes('from favori')) {
    if (q.includes('where client_nom = ?')) {
      return Promise.resolve(favoris.filter(f => f.client_nom === params[0]).map(f => ({ produit_id: f.produit_id })));
    }
    return Promise.resolve(favoris);
  }

  if (q.includes('from commande_item')) {
    if (q.includes('where commande_id = ?')) {
      return Promise.resolve(commande_items.filter(cp => cp.commande_id === params[0]));
    }
    return Promise.resolve(commande_items);
  }

  if (q.includes('from commande')) {
    if (q.includes('where client_nom = ?')) {
      return Promise.resolve(commandes.filter(cmd => cmd.client_nom === params[0]).map(cmd => ({
        id: cmd.id,
        date: cmd.date,
        total: cmd.total
      })));
    }
    return Promise.resolve(commandes);
  }

  return Promise.resolve([]);
}

function getFirstAsync(query, ...params) {
  const q = query.toLowerCase().trim().replace(/\s+/g, ' ');

  if (q.includes('from produit')) {
    return Promise.resolve({ count: produits.length });
  }

  if (q.includes('from client')) {
    if (q.includes('where nom = ?')) {
      const found = clients.find(c => c.nom === params[0]);
      return Promise.resolve(found || null);
    }
  }

  return Promise.resolve(null);
}

function runAsync(query, ...params) {
  const q = query.toLowerCase().trim().replace(/\s+/g, ' ');

  if (q.startsWith('insert into produit')) {
    const newProduct = {
      id: ids.produit++,
      nom: params[0],
      description: params[1],
      prix: params[2],
      image: params[3]
    };
    produits.push(newProduct);
    return Promise.resolve({ changes: 1, lastInsertRowId: newProduct.id });
  }

  if (q.startsWith('delete from produit')) {
    const originalLength = produits.length;
    produits = produits.filter(p => p.id !== params[0]);
    return Promise.resolve({ changes: originalLength - produits.length > 0 ? 1 : 0 });
  }

  if (q.startsWith('insert into client')) {
    const newClient = {
      id: ids.client++,
      nom: params[0],
      mdp: params[1],
      admin: params[2],
      adresse: params[3],
      langue: params[4]
    };
    clients.push(newClient);
    return Promise.resolve({ changes: 1, lastInsertRowId: newClient.id });
  }

  if (q.startsWith('update client')) {
    const client = clients.find(c => c.nom === params[params.length - 1]);
    if (client) {
      if (q.includes('langue = ?')) {
        client.langue = params[0];
      } else if (q.includes('adresse = ?')) {
        client.adresse = params[0];
      } else if (q.includes('mdp = ?')) {
        client.mdp = params[0];
      }
    }
    return Promise.resolve({ changes: client ? 1 : 0 });
  }

  if (q.startsWith('insert into favori')) {
    favoris.push({ client_nom: params[0], produit_id: params[1] });
    return Promise.resolve({ changes: 1 });
  }

  if (q.startsWith('delete from favori')) {
    const original = favoris.length;
    favoris = favoris.filter(f => !(f.client_nom === params[0] && f.produit_id === params[1]));
    return Promise.resolve({ changes: original !== favoris.length ? 1 : 0 });
  }

  if (q.startsWith('insert into commande_item')) {
    commande_items.push({
      commande_id: params[0],
      produit_nom: params[1],
      produit_prix: params[2],
      quantite: params[3],
      produit_image: params[4]
    });
    return Promise.resolve({ changes: 1, lastInsertRowId: ids.commande_item++ });
  }

  if (q.startsWith('insert into commande')) {
    const cmd = {
      id: ids.commande++,
      client_nom: params[0],
      date: params[1],
      total: params[2]
    };
    commandes.push(cmd);
    return Promise.resolve({ changes: 1, lastInsertRowId: cmd.id });
  }

  return Promise.resolve({ changes: 0 });
}

const mockDb = {
  getAllAsync,
  getFirstAsync,
  runAsync,
  execAsync
};

export const SQLiteProvider = function({ children }) {
  return children;
};

export const useSQLiteContext = function() {
  return mockDb;
};
