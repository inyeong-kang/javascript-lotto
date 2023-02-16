const {
  lottoNumberRange,
  LOTTO_NUMBER_COUNT,
} = require('../constants/constants');

const randomNumberGenerator = {
  generateRandomNumber() {
    return Math.floor(
      Math.random() *
        (lottoNumberRange.MAX_LOTTO_NUMBER -
          lottoNumberRange.MIN_LOTTO_NUMBER) +
        lottoNumberRange.MIN_LOTTO_NUMBER
    );
  },

  generateLottoNumbers() {
    const lottoNumbers = [];

    while (lottoNumbers.length < LOTTO_NUMBER_COUNT) {
      const randomNumber = this.generateRandomNumber();
      this.fillLottoNumbers(lottoNumbers, randomNumber);
    }

    return this.sortLottoNumbers(lottoNumbers);
  },

  fillLottoNumbers(lottoNumbers, randomNumber) {
    if (!this.isNumberDuplicate(lottoNumbers, randomNumber))
      lottoNumbers.push(randomNumber);
  },

  isNumberDuplicate(lottoNumbers, randomNumber) {
    return lottoNumbers.includes(randomNumber);
  },

  sortLottoNumbers(lottoNumbers) {
    return lottoNumbers.sort((a, b) => a - b);
  },
};

module.exports = { randomNumberGenerator };