import './App.css';

var grid1 = [ [1, 2, 3],
              [4, 5, 6] ];

var grid2 = [ [1, 5, 1, 4, 2, 1],
              [2, 2, 4, 1, 1, 1],
              [3, 6, 3, 5, 6, 3],
              [1, 1, 1, 1, 5, 4],
              [3, 6, 4, 2, 4, 3],
              [4, 4, 1, 1, 1, 1],
              [5, 3, 6, 5, 1, 2],
              [1, 3, 5, 3, 1, 2] ];
        
function draw(grid) {
  var row = grid.length, col = grid[0].length;
  var size = "calc(100%/"+col+")";
  var res=[];

  for(var i=0; i<row; i++) {
    var tmp=[];

    for(var j=0; j<col; j++) {
      var image="img/"+grid[i][j]+".jpg";

      tmp[j]= (
        <div id={i+''+j} key={i+''+j} className='grid' style={{width: size}}>
          <img src={image} alt="a" width="100%"/>
        </div>
      );
    }

    res[i] = tmp;
  }

  return res;
}

function App() {
  return (
    <div>
      <div className="Wrapper">
        {
          draw(grid1).map((item, index) => (
            <div key={index}>{item}</div>
          ))
        }
      </div>

      <div className="Wrapper">
        {
          draw(grid2).map((item, index) => (
            <div key={index}>{item}</div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
