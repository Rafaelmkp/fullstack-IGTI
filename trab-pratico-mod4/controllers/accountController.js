import { db } from '../models/index.js';

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
    let deposited = await getAccountIfExists(account);
    deposited.balance += account.balance;
    deposited = new Account(deposited);
    await deposited.save();

    res.send(deposited);
  } catch (err) {
    err.message = 'Erro ao depositar';
    next(err);
  }
}

//item 5
export async function withdraw(req, res, next) {
  const account = req.body;

  try {
    let drawed = await getAccountIfExists(account);

    drawed.balance -= account.balance + global.BANK_WITHDRAW_TAX;
    if (drawed.balance < 0) {
      throw new Error('Saldo insuficiente');
    }

    drawed = new Account(drawed);
    await drawed.save();
    res.send(drawed);
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
export async function excludeAccount(req, res, next) {
  const account = req.body;

  try {
    let excluded = await getAccountIfExists(account);
    await Account.findByIdAndRemove({ _id: excluded._id });

    let accountsNumber = await Account.find({
      agencia: excluded.agencia,
    }).countDocuments();

    res.send({ totalAccounts: accountsNumber });
  } catch (err) {
    err.message += ' - erro ao excluir conta.';
    next(err);
  }
}

//item 8
export async function transferValue(req, res, next) {
  const account = req.body;
  const transfered = account.valor;

  try {
    let sourceAcc = await getAccountIfExists({ conta: account.contaOrigem });
    let targetAcc = await getAccountIfExists({ conta: account.contaDestino });

    if (sourceAcc.agencia !== targetAcc.agencia) {
      sourceAcc.balance -= global.BANK_TRANSFER_TAX;
    }
    sourceAcc.balance -= transfered;

    if (sourceAcc.balance < 0) {
      throw new Error('Saldo insuficiente.');
    }

    targetAcc.balance += transfered;

    sourceAcc = new Account(sourceAcc);
    await sourceAcc.save();
    targetAcc = new Account(targetAcc);
    await targetAcc.save();

    res.send(sourceAcc);
  } catch (err) {
    err.message += ' - erro ao realizar transferencia.';
    next(err);
  }
}

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
