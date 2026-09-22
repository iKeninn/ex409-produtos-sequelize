const express = require("express");
const { Produto } = require("../models/produto");

const router = express.Router();

router.get("/", async (req, res) => {
  const produtos = await Produto.findAll();

  res.status(200).json(produtos);
});

router.get("/:id", async (req, res) => {
  const produto = await Produto.findByPk(req.params.id);

  if (!produto) {
    return res.status(404).json({ erro: "Produto não encontrado" });
  }

  res.status(200).json(produto);
});

// POST /produtos — cria um produto
router.post("/", async (req, res) => {
  const { descricao, preco } = req.body;

  if (descricao === undefined || preco === undefined) {
    return res.status(400).json({ erro: "descricao e preco são obrigatórios" });
  }

  const produto = await Produto.create({
    descricao,
    preco,
  });

  res.status(201).json(produto);
});

router.put("/:id", async (req, res) => {
  const { descricao, preco } = req.body;

  const produto = await Produto.findByPk(req.params.id);

  if (!produto) {
    return res.status(404).json({ erro: "Produto não encontrado" });
  }

  if (descricao === undefined || preco === undefined) {
    return res.status(400).json({ erro: "descricao e preco são obrigatórios" });
  }

  produto.descricao = descricao;
  produto.preco = preco;

  await produto.save();

  res.status(200).json(produto);
});

router.patch("/:id", async (req, res) => {
  const produto = await Produto.findByPk(req.params.id);

  if (!produto) {
    return res.status(404).json({ erro: "Produto não encontrado" });
  }

  const { descricao, preco } = req.body;

  if (descricao !== undefined) {
    produto.descricao = descricao;
  }

  if (preco !== undefined) {
    produto.preco = preco;
  }

  await produto.save();

  res.status(200).json(produto);
});

router.delete("/:id", async (req, res) => {
  const produto = await Produto.findByPk(req.params.id);

  if (!produto) {
    return res.status(404).json({ erro: "Produto não encontrado" });
  }

  await produto.destroy();

  res.status(204).send();
});

module.exports = router;
