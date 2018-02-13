exports.seed = function (knex, Promise) {
    return knex('users')
        .del() // delete existing users
        .then(function () {
            return knex('users').insert([
                { email: 'test01@test.com', password: '12345' }, // 1
                { email: 'test02@test.com', password: '12345' }, // 2
                { email: 'test03@test.com', password: '12345' }, // 3
                { email: 'test04@test.com', password: '12345' }, // 4
                { email: 'test05@test.com', password: '12345' }, // 5
            ]);
        });
};
