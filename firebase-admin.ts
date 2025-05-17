import { initializeApp, getApps, getApp, App, cert } from 'firebase-admin/app';

import { getFirestore } from 'firebase-admin/firestore';

const sertviceKey = require("@/service_key.json");

let app: App;

if (getApps().length === 0) {
  app = initializeApp({
    credential: cert(sertviceKey),
    databaseURL: 'https://notion-clone-8ed31.firebaseio.com',
  });
} else {
    app = getApp();
}

const adminDb = getFirestore(app);

export { app as adminApp, adminDb };
// export { app, db };