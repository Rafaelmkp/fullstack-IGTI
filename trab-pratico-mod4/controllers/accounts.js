import express from 'express';

export async function loadData(_req, res, next) {
  try {
    const initialData = JSON.parse(await readFile(global.FILEACC));

    for (const account of initialData) {
      const newAcc = new accountModel(account);
      await newAcc.save();
    }

    res.send(initialData);
  } catch (err) {
    next(err);
  }
}

//item 4
export async function deposit(req, res, next) {
  //params: valor, agencia e conta
  //validar se conta existe
  //atualizar balance
}

//item 5
export async function withdraw(req, res, next) {}

//item 6
export async function checkBalance(req, res, next) {}

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
