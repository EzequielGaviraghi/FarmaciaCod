const express = require('express');
const fs = require('fs');
const server = express();
const dados = require('./data/dados.json');

server.use(express.json());

server.get('/', (req, res) => {
    return res.json({ mensagem: 'Nossa API está funcionando' });
});

server.listen(3000, () => {
    console.log("Esta vivo!");
});

function saveData() {
    fs.writeFileSync(__dirname + '/data/dados.json', JSON.stringify(dados, null, 2))
}

server.post('/medicamento', (req, res) => {
    const newMed = req.body;

    if (!newMed.id || !newMed.nome || !newMed.fabricante || !newMed.preco || !newMed.quantidade) {
        return res.status(400).json({ mensagem: "Dados incompletos." });
    } else {
        dados.Medicamento.push(newMed);
        saveData(dados);
        return res.status(201).json({ mensagem: 'Medicamento cadastrado com sucesso.' });
    }
});

server.post('/cliente', (req, res) => {
    const newClient = req.body;

    if (!newClient.id || !newClient.nome || !newClient.endereco || !newClient.email || !newClient.telefone) {
        return res.status(400).json({ mensagem: "Dados incompletos." });
    } else {
        dados.Cliente.push(newClient);
        saveData(dados);
        return res.status(201).json({ mensagem: 'A clientela foi cadastrada com sucesso.' });
    }
});

server.post('/fornecedor', (req, res) => {
    const newSupplier = req.body;

    if (!newSupplier.id || !newSupplier.nome || !newSupplier.endereco || !newSupplier.telefone) {
        return res.status(400).json({ mensagem: "Dados incompletos." });
    } else {
        dados.Fornecedor.push(newSupplier);
        saveData(dados);
        return res.status(201).json({ mensagem: 'Fornecedor cadastrado com sucesso.' });
    }
});

server.post('/venda', (req, res) => {
    const newSale = req.body;

    if (!newSale.id || !newSale.data || !newSale.id_medicamento || !newSale.id_cliente) {
        return res.status(400).json({ mensagem: "Dados incompletos." });
    } else {
        dados.Venda.push(newSale);
        saveData(dados);
        return res.status(201).json({ mensagem: 'Venda cadastrada com sucesso.' });
    }
});

server.get('/medicamento', (req, res) => {
    return res.json(dados.Medicamento);
});

server.get('/cliente', (req, res) => {
    return res.json(dados.Cliente);
});

server.get('/fornecedor', (req, res) => {
    return res.json(dados.Fornecedor);
});

server.get('/venda', (req, res) => {
    return res.json(dados.Venda);
});

server.put('/medicamento/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updateMed = req.body;
    const medId = dados.Medicamento.findIndex(i => i.id === id);

    if (medId === -1) {
        return res.status(404).json({ mensagem: "Medicamento não encontrado" });
    } else {
        dados.Medicamento[medId].nome = updateMed.nome || dados.Medicamento[medId].nome;
        dados.Medicamento[medId].preco = updateMed.preco || dados.Medicamento[medId].preco;
        dados.Medicamento[medId].fabricante = updateMed.fabricante || dados.Medicamento[medId].fabricante;
        dados.Medicamento[medId].quantidade = updateMed.quantidade || dados.Medicamento[medId].quantidade;

        saveData(dados);

        return res.json({ mensagem: "Medicamento atualizado com sucesso" });
    }
});

server.put('/cliente/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updateClient = req.body;
    const clientId = dados.Cliente.findIndex(i => i.id === id);

    if (clientId === -1) {
        return res.status(404).json({ mensagem: "Cliente não encontrado" });
    } else {
        dados.Cliente[clientId].nome = updateClient.nome || dados.Cliente[clientId].nome;
        dados.Cliente[clientId].endereco = updateClient.endereco || dados.Cliente[clientId].endereco;
        dados.Cliente[clientId].email = updateClient.email || dados.Cliente[clientId].email;
        dados.Cliente[clientId].telefone = updateClient.telefone || dados.Cliente[clientId].telefone;

        saveData(dados);

        return res.json({ mensagem: "Cliente atualizado com sucesso" });
    }
});

server.put('/fornecedor/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updateSupplier = req.body;
    const supplierId = dados.Fornecedor.findIndex(i => i.id === id);

    if (supplierId === -1) {
        return res.status(404).json({ mensagem: "Fornecedor não encontrado" });
    } else {
        dados.Fornecedor[supplierId].nome = updateSupplier.nome || dados.Fornecedor[supplierId].nome;
        dados.Fornecedor[supplierId].endereco = updateSupplier.endereco || dados.Fornecedor[supplierId].endereco;
        dados.Fornecedor[supplierId].telefone = updateSupplier.telefone || dados.Fornecedor[supplierId].telefone;

        saveData(dados);

        return res.json({ mensagem: "Fornecedor atualizado com sucesso" });
    }
});

server.put('/venda/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updateSale = req.body;
    const saleId = dados.Venda.findIndex(i => i.id === id);

    if (saleId === -1) {
        return res.status(404).json({ mensagem: "Venda não encontrada" });
    } else {
        dados.Venda[saleId].data = updateSale.data || dados.Venda[saleId].data;
        dados.Venda[saleId].id_medicamento = updateSale.id_medicamento || dados.Venda[saleId].id_medicamento;
        dados.Venda[saleId].id_cliente = updateSale.id_cliente || dados.Venda[saleId].id_cliente;

        saveData(dados);

        return res.json({ mensagem: "Venda atualizada com sucesso" });
    }
});
