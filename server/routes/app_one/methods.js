const _ = require('lodash');
const luxon = require('luxon');
const Utils = require('../../helper/utils');

const not = o => !o;

async function deactivateProductRepository(pr_id) {
  // let pr = await new WProductRepository().getProductRepositoryWithAllFields(pr_id);
  // if (not(pr)) return Utils.errBody('Product repository not found with this id');
  // pr.isProductRepositoryAlive = false;
  // const info = await RepoProduct.updateMany({_id: {$in: pr.repoProducts}}, {$set: {isFreeze: true, isProductRepositoryActive: false}});
  // pr = await pr.save();
  // return {document: info};
}

async function activateProductRepository(pr_id, validityInDays, inventoryLength, planName) {
  // let pr = await new WProductRepository().getProductRepositoryWithAllFields(pr_id);
  // if (not(pr)) return Utils.errBody('Product repository not found with this id');

  // const today = luxon.DateTime.fromISO(new Date().toISOString());
  // const hadToExpireOn = luxon.DateTime.fromISO(new Date(pr.lastPaymentOn).toISOString());

  // // in the client side we have a recharge margin date... which is set to 5,
  // // so next recharge action might only increase 5 days from base validityForDays value i.e 30 || 90
  // const marginDays = hadToExpireOn.diff(today, ['months', 'days', 'hours']).toObject()['days'];
  // const validityForDays = validityInDays + (marginDays > 0 && marginDays <= 5 ? marginDays : 0);

  // pr.lastPaymentOn = new Date();
  // pr.isProductRepositoryAlive = true;
  // pr.lastPaymentPlanValidForDays = +validityForDays;
  // pr.productRepositoryCoverage = planName;
  // pr.inventoryLength = inventoryLength;

  // const isSearchableStandalone = WProductRepository.isProductRepositorySearchable(pr.productRepositoryCoverage);

  // const info = await RepoProduct.updateMany(
    // {_id: {$in: pr.repoProducts}},
    // {
      // $set: {
        // isFreeze: false,
        // isProductRepositoryActive: true,
        // isSearchableStandalone,
      // },
    // }
  // );

  // pr = await pr.save();
  // return {document: info, repository: pr};
}

module.exports = {
  deactivateProductRepository,
  activateProductRepository
};
