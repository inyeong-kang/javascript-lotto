const { PRICE_UNIT, restartCommand } = require('../constants/constants');
const Lottos = require('../domain/model/Lottos');
const WinningNumbers = require('../domain/model/WinningNumbers');
const exception = require('../utils/exception');
const Console = require('../view/Console');
const inputView = require('../view/inputView');
const outputView = require('../view/outputView');

class LottoGameController {
  #lottos;

  #winningNumbers;

  playGame() {
    this.inputPurchasePrice();
  }

  inputPurchasePrice() {
    inputView.readPurchasePrice((purchasePriceInput) => {
      try {
        const lottoCount = this.calculateLottoCount(purchasePriceInput);
        this.#lottos = new Lottos(lottoCount);
        this.showPurchasedLottos();
      } catch (error) {
        Console.print(error.message);
        this.inputPurchasePrice();
      }
    });
  }

  calculateLottoCount(priceInput) {
    exception.handlePurchasePrice(priceInput);

    const price = Number(priceInput);

    return Math.floor(price / PRICE_UNIT);
  }

  showPurchasedLottos() {
    outputView.printLottoCount(this.#lottos.getLottos().length);
    outputView.printLottoNumbers(this.#lottos.getLottos());

    this.inputWinningNumbers();
  }

  inputWinningNumbers() {
    inputView.readWinningNumbers((winningNumbersInput) => {
      try {
        this.inputBonusNumber(winningNumbersInput);
      } catch (error) {
        Console.print(error.message);
        this.inputWinningNumbers();
      }
    });
  }

  inputBonusNumber(winningNumbersInput) {
    inputView.readBonusNumber((bonusNumberinput) => {
      try {
        this.#winningNumbers = new WinningNumbers(
          winningNumbersInput,
          bonusNumberinput
        );

        this.showResult();
      } catch (error) {
        Console.print(error.message);
        this.inputBonusNumber();
      }
    });
  }

  showResult() {
    this.#lottos.calculateAllRanks(
      this.#winningNumbers.getWinningNumbers(),
      this.#winningNumbers.getBonusNumber()
    );

    outputView.printStatistics(this.#lottos.getAllRanks());
    outputView.printProfitRate(this.#lottos.getProfitRate());

    this.inputRestartCommand();
  }

  inputRestartCommand() {
    inputView.readRestartCommand((restartCommandInput) => {
      try {
        exception.handleRestartCommand(restartCommandInput);
        if (restartCommandInput === restartCommand.YES) return this.restart();
        Console.close();
      } catch (error) {
        Console.print(error.message);
        this.inputRestartCommand();
      }
    });
  }

  restart() {
    this.#winningNumbers = null;
    this.#lottos = null;

    this.playGame();
  }
}

module.exports = LottoGameController;
