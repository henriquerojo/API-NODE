// ## FIND

/**
 *  find é a função para fazer consultas no MongoDB e,
 *   quando usada sem parâmetros, retorna todos os documentos da coleção.
 */
db.customers.find().pretty();

/**
 *  Note que a função find pode receber um documento por parâmetro representando
 *  o filtro a ser aplicado sobre a coleção para retornar documentos.
 *  Nesse caso, disse ao find que retornasse todos os documentos que possuam o campo uf definido como “RS”.
 *  O resultado no seu terminal deve ser somente o customer de nome “Teste”
 *  (não vou falar do _id dele aqui pois o valor muda completamente de um servidor MongoDB para outro).
 */
db.customers.find({ uf: "RS" });

/**
 *  O operador $gte (Greater Than or Equal) retorna todos os documentos que possuam o campo
 *  idade e que o valor do mesmo seja igual ou superior à 18. E podemos facilmente
 *  combinar filtros usando vírgulas dentro do documento passado por parâmetro,
 *  assim como fazemos quando queremos inserir campos em um documento:
 */
db.customers.find({ idade: { $gte: 18 } });
db.customers.find({ nome: "Luiz", idade: { $gte: 18 } });

/**
 * Outros operadores que você pode usar junto ao filtro do find são:
 *
 *  $eq: exatamente igual (=)
 *  $ne: diferente (<> ou !=)
 *  $gt: maior do que (>)
 *  $lt: menor do que (<)
 *  $lte: menor ou igual a (<=)
 *  $in: o valor está contido em um array de possibilidades, como em um OU. Ex: {idade: {$in: [10,12] }}
 *
 */

/**
 *  Você também pode usar findOne ao invés de find para retornar apenas o primeiro documento,
 *  ou ainda as funções limit e skip para limitar o número de documentos retornados e para ignorar a
 *  lguns documentos, especificamente, da seguinte maneira:
 */
db.customers.find().skip(1).limit(10);

/**
 *  E para ordenar? Usamos a função sort no final de todas as outras, com um documento indicando quais
 *  campos e se a ordenação por aquele campo é crescente (1) ou descrescente (-1),
 *  como abaixo em que retorno todos os customers ordenados pela idade:
 */
db.customers.find().sort({ idade: 1 });
