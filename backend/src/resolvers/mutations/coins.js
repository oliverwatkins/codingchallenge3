module.exports = async (_, {input}, {models}) => {
    newERC20Coin = await models.ERC20Coin.create(input);
    return newERC20Coin;
}

const { models } = require("mongoose")

module.exports = async (_, {id, input}, {models}) => {
    const ERC20CoinToUpdate = await models.ERC20Coin.findOne({_id: id});

    Object.keys(input).forEach(value => {
        ERC20CoinToUpdate[value] = input[value];
    });

    const updatedERC20Coin = await ERC20CoinToUpdate.save();
    return updatedERC20Coin;
}


module.exports = async (_, {id}, {models}) => {
    const deleteCoin = await models.ERC20Coin.deleteOne({_id: id});

    if(deleteCoin.deletedCount) return{id: id}
}