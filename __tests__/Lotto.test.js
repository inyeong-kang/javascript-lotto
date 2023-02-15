const { profitByRank } = require('../src/constants/constants');
const Lotto = require('../src/domain/model/Lotto');
const { calculateRank, calculateProfit } = require('../src/utils');

describe('로또 클래스 테스트', () => {
  test.each([
    [8, 21, 23, 41, 42, 43],
    [3, 5, 11, 16, 32, 38],
    [7, 11, 16, 35, 36, 44],
    [1, 8, 11, 31, 41, 42],
  ])(
    '당첨 번호를 넘겨주었을 때, 해당 값을 필드로 갖는 인스턴스를 생성 기능',
    (lottoNumbers) => {
      const lotto = new Lotto(lottoNumbers);

      expect(lottoNumbers).toEqual(lotto.getNumbers());
    }
  );

  test.each([
    { input: [1, 2, 3, 4, 5, 6], expectedRank: 1 },
    { input: [1, 2, 3, 4, 5, 7], expectedRank: 2 },
    { input: [1, 2, 3, 4, 5, 8], expectedRank: 3 },
    { input: [1, 2, 3, 4, 8, 9], expectedRank: 4 },
    { input: [1, 2, 3, 8, 9, 10], expectedRank: 5 },
  ])(
    '당첨 번호와 보너스 번호를 넘겨주었을 때, 로또 번호와 비교하여 등수를 계산 기능',
    ({ input, expectedRank }) => {
      const lotto = new Lotto(input);
      const winningNumbers = [1, 2, 3, 4, 5, 6];
      const bonusNumber = 7;

      lotto.calculateRank(winningNumbers, bonusNumber);

      expect(lotto.getRank()).toEqual(expectedRank);
    }
  );

  test.each([
    { lottoNumber: [1, 2, 3, 4, 5, 6], expectedProfit: profitByRank[0] },
    { lottoNumber: [1, 2, 3, 4, 5, 7], expectedProfit: profitByRank[1] },
    { lottoNumber: [1, 2, 3, 4, 5, 8], expectedProfit: profitByRank[2] },
    { lottoNumber: [1, 2, 3, 4, 8, 9], expectedProfit: profitByRank[3] },
    { lottoNumber: [1, 2, 3, 8, 9, 10], expectedProfit: profitByRank[4] },
    { lottoNumber: [8, 9, 10, 11, 12, 13], expectedProfit: 0 },
  ])('등수 입력시 수익을 반환하는 기능', ({ lottoNumber, expectedProfit }) => {
    const lotto = new Lotto(lottoNumber);
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    lotto.calculateRank(winningNumbers, bonusNumber);

    const profit = calculateProfit(lotto.getRank());

    expect(profit).toBe(expectedProfit);
  });

  test.each([
    { lottoNumber: [1, 2, 3, 4, 5, 6], expectedProfit: profitByRank[0] },
    { lottoNumber: [1, 2, 3, 4, 5, 7], expectedProfit: profitByRank[1] },
    { lottoNumber: [1, 2, 3, 4, 5, 8], expectedProfit: profitByRank[2] },
    { lottoNumber: [1, 2, 3, 4, 8, 9], expectedProfit: profitByRank[3] },
    { lottoNumber: [1, 2, 3, 8, 9, 10], expectedProfit: profitByRank[4] },
    { lottoNumber: [8, 9, 10, 11, 12, 13], expectedProfit: 0 },
  ])('등수 입력시 수익을 반환하는 기능', ({ lottoNumber, expectedProfit }) => {
    const lotto = new Lotto(lottoNumber);
    const winningNumbers = [1, 2, 3, 4, 5, 6];
    const bonusNumber = 7;

    lotto.calculateRank(winningNumbers, bonusNumber);

    const profit = calculateProfit(lotto.getRank());

    expect(profit).toBe(expectedProfit);
  });
});
