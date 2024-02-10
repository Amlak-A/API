const express = require('express');
const methodOverride = require('method-override');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = 3002;
app.use(methodOverride('X-HTTP-Method-Override'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Connect to database
mongoose.connect('mongodb://127.0.0.1:27017/name');
const Name = mongoose.model('names', { name: String });

//respons
app.get('/action', (req, res) => {
  res.json({ status: 'Data received successfully' });
});



// Get
app.get('/action/name', (req, res) => {
    Name.find({})
      .then(names => {
        res.json(names);
      })
      .catch(err => {
        console.log(`Error: ${err}`);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  });
  

// Post
app.post('/action/name/create', (req, res) => {
  const newName = new Name({ name: req.body.name });
  newName.save()
    .then(() => {
      res.send('Data added');
    })
    .catch(err => {
      console.log(`Error: ${err}`);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});

// Update 
app.put('/action/name/update/:_id', (req, res) => {
    const id = req.params._id;
    Name.findByIdAndUpdate(id, { name: req.body.name })
      .then(() => {
        res.send('Update successfully');
      })
      .catch(err => {
        console.log(`Error: ${err}`);
        res.status(500).json({ error: 'Internal Server Error' });
      });
  });
  

// Delete 
app.delete('/action/name/delete/:_id', (req, res) => {
  const id = req.params._id;
  Name.findByIdAndDelete(id)
    .then(() => {
        res.send('delete successfully');
      })
      .catch(err => {
        console.log(`Error: ${err}`);
        res.status(500).json({ error: 'Internal Server Error' });
      });
});


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
