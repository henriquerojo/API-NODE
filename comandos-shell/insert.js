// ## INSERT

/**
 *  A função insertOne espera um documento JSON por parâmetro com as informações que queremos inserir,
 *  sendo que além dessas informações o MongoDB vai inserir um campo _id automático como chave primária desta coleção.
 *
 */
db.customers.insertOne({ nome: "Luiz", idade: 29 });

custArray = [
  { nome: "Fernando", idade: 29 },
  { nome: "Teste", uf: "RS" },
];
db.customers.insertMany(custArray);
