import React from 'react'

const Colors = {
  black: '#151515'
};

const App = () => {
  const [folderName, setFolderName] = React.useState(null);
  const [images, setImages] = React.useState([]);

  const _fileListToArr = fileList => {
    const arr = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      arr.push(file)
    }

    arr.sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0
    });

    return arr;
  };

  const handleFileUpload = fileList => {
    const relativePath = fileList[0].webkitRelativePath;
    const folder = relativePath.split('/')[0];
    setFolderName(folder);

    const arr = _fileListToArr(fileList);
    setImages(arr)
  };

  return (
    <div style={{ fontFamily: 'sans-serif', margin: -8, display: 'flex', justifyContent: 'center', color: Colors.black }}>
      <div style={{ width: 516 }}> {/* main body */}
        <div style={{ padding: '58px 8px 8px', border: '1px solid grey', marginBottom: 24 }}> {/* header */}
          <div style={{ fontWeight: 'bold', fontSize: 32 }}>webtoon reader</div>
          <div>created by Ronna Firmo</div>

          <div style={{ margin: '24px 0 0' }}>Select a folder containing webtoon images to get started!</div>
        </div> {/* header */}

        <div style={{ width: 'inherit', border: '1px solid grey', marginBottom: 8, position: 'sticky', top: 0, background: 'rgba(255, 255, 255, 0.75)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ margin: 8 }}> Directory: <b style={{ background: '#ffeb3b', padding: '0 4px' }}>{folderName || 'none selected'}</b></div>
            <input onChange={e => handleFileUpload(e.target.files)} directory="" webkitdirectory="" type="file" />
          </div>
        </div>

        <div style={{ width: 'inherit', border: '1px solid grey' }}>
          {!images.length && (
            <div style={{ margin: 8, color: 'grey' }}>Your webtoon will be displayed here</div>
          )}
          {images.map((file, i) => {
            const src = URL.createObjectURL(file);
            return (
              <img src={src} style={{ width: 'inherit', marginTop: i === 0 ? 0 : -4 }} />
            )
          })}
        </div>
      </div> {/* main body */}
    </div> // parent
  )
};

export default App;
