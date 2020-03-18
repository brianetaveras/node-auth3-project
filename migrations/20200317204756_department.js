
exports.up = async function(knex) {
    await knex.schema.alterTable('users', function(table) {
        table.text('department')
     })
};

exports.down = async function(knex) {
        await knex.schema.table('users', function(table){
            table.dropColumn('department')
        })


};
