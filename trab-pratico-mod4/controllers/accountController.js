import { db, BANK_WITHDRAW_TAX } from '../models/index.js';

const Account = db.account;

export async function loadData(_req, res, next) {
  try {
    const initialData = JSON.parse(await readFile(global.FILEACC));

    for (const account of initialData) {
      const newAcc = new Account(account);
      await newAcc.save();
    }

    res.send(initialData);
  } catch (err) {
    next(err);
  }
}

//item 4
export async function deposit(req, res, next) {
  const account = req.body;

  try {
    let deposit = await getAccountIfExists(account);
    deposit.balance += account.balance;
    deposit = new Account(deposit);
    await deposit.save();

    res.send(deposit);
  } catch (err) {
    err.message = 'Erro ao depositar';
    next(err);
  }
}

//item 5
export async function withdraw(req, res, next) {
  const account = req.body;

  try {
    let draw = await getAccountIfExists(account);

    draw.balance -= account.balance + BANK_WITHDRAW_TAX;
    if (draw.balance < 0) {
      throw new Error('Saldo insuficiente');
    }

    draw = new Account(draw);
    await draw.save();
    res.send(draw);
  } catch (err) {
    err.message += ' - erro ao sacar.';
    next(err);
  }
}

//item 6
export async function checkBalance(req, res, next) {
  const { agencia, conta } = req.params;

  try {
    const balance = await getAccountIfExists({ agencia, conta });
    res.send(balance);
  } catch (err) {
    err.meessage += '- erro ao consultar saldo';
    next(err);
  }
}

//item 7
export async function excludeAccount(req, res, next) {}

//item 8
export async function transferValue(req, res, next) {}

//item 9
export async function checkAvgBalance(req, res, next) {}

//item 10
export async function checkSmallBalance(req, res, next) {}

//item 11
export async function checkWealthierClients(req, res, next) {}

//item 12
export async function transferClientsToPrivate(req, res, next) {}

const getAccountIfExists = async (account) => {
  const { agencia, conta } = account;
  account = {
    agencia,
    conta,
  };
  try {
    if (typeof account.agencia !== 'undefined') {
      account = await Account.findOne(account);
    } else {
      account = await Account.findOne({ conta: account.conta });
    }
    if (!account) {
      throw new Error(`(${agencia}/${conta}) agencia/conta invalida`);
    }
  } catch (err) {
    next(err);
  }
};
