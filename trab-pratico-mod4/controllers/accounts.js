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
