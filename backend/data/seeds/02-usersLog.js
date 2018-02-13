exports.seed = function (knex, Promise) {
    return knex('usersLog')
        .del() // delete existing users
        .then(function () {
            return knex('usersLog').insert([
                { userId: 1, acess: '000012' }, // 1
                { userId: 2, acess: '000013' }, // 2
                { userId: 3, acess: '000014' }, // 3
                { userId: 4, acess: '000015' }, // 4
                { userId: 5, acess: '000016' }, // 5
            ]);
        });
};
