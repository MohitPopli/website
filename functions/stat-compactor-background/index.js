/* eslint-disable @typescript-eslint/no-var-requires */
const admin = require('firebase-admin')

const serviceAccount = require('../serviceAccountKey.json')

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://raid-stats-c1d5a-default-rtdb.firebaseio.com',
  })
}
const firestore = admin.firestore()

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return
  }

  const raidStatsRef = firestore.collection('raid-stats')

  const data = await raidStatsRef.get()
  console.log(JSON.stringify(data.docs.map((s) => s.id)))
}
