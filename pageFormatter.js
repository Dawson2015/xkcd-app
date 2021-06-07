const xkcdFunction = require('./function');

function isValidId(path) {
  const validId = /\/\d+\/?$/; 
  // matches the charactera digit (equal to [0-9]), Matches between one and unlimited times, Matches between zero and one times
  return path === '/' || validId.test(path);
}

function parseId(path) {
  const getId = /\d+/;
  const id = path.match(getId);
  return (id && id[0]) || '';
}

function formPage(props) {
  return `
		<!DOCTYPE html>
		<html>
			<head>  
				<meta charset='utf-8'>
                <link rel='stylesheet' type='text/css' href='style.css' />
                <link rel='shortcut icon' href='data:image/x-icon;,' type='image/x-icon'> 
			</head>
			<body>
				<div class='content'>
					<div class='mainPage'>
                        <h1>${props.title}</h1>
                        <a href='${props.url}' alt='${props.title}'>
                            <img id='imagePage' src='${props.img}' title='${props.alt}' />
                        </a>
                        <p id='altText'>${props.alt}</p>
                        <p id='date'>Date (yyyy/mm/dd): ${props.date}</p>
                        <p id='counter'>Visited Times: ${props.counter}</p>
					</div>
					<div>
                        <a href='/1' class = 'button'>First</a> 
                        <a href='/${props.prev}' class = 'button'>Previous</a>
                        <a href='/${props.next}' class = 'button'>Next</a> 
                        <a href='/' class = 'button'>Last</a>
                        <a href='/${props.random}' class = 'button'>Random</a> 
					</div>
				</div>
			</body>
		</html>`.trim();
}

module.exports = function render(req, res) {
  if (isValidId(req.path)) {
    xkcdFunction(parseId(req.path))
      .then(props => {
        return res.status(200).send(formPage(props));
      })
      .catch(err => res.status(500).send(err));
  } else {
    return res.redirect('/');
  }
};