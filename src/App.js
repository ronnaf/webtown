import React from 'react'

const Colors = {
  black: '#151515'
};

const App = () => {
  const [folderName, setFolderName] = React.useState(null);
  const [images, setImages] = React.useState([]);
  const [chapters, setChapters] = React.useState([]);
  const [currentChapterIndex, setCurrentChapterIndex] = React.useState(0);

  const _fileListToArr = fileList => {
    const arr = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      arr.push(file)
    }

    return arr;
  };

  const _sortChapters = fileListArr => {
    // segregate pictures into chapters
    const chaptersAsObjects = {}; // chapterO1: [001.jpg, 002.jpg]
    for (let i = 0; i < fileListArr.length; i++) {
      const relativePath = fileListArr[i].webkitRelativePath
      const splittedPaths = relativePath.split('/'); // ['whats wrong with', 'chapter 01', '001.jpg']
      if (!chaptersAsObjects[splittedPaths[1]]) {
        chaptersAsObjects[splittedPaths[1]] = []
      }
      chaptersAsObjects[splittedPaths[1]].push(fileListArr[i]);
    }

    // convert chapter objects to array
    const chapterArray = [];
    Object.keys(chaptersAsObjects).map(chapterKey => {
      const images = chaptersAsObjects[chapterKey];
      _sortAlphabetically(images, 'name');
      chapterArray.push({ chapterKey, images })
    });

    return chapterArray
  };

  const _sortAlphabetically = (arr, basisField = 'name') => {
    arr.sort((a, b) => {
      if (a[basisField] < b[basisField]) {
        return -1;
      }
      if (a[basisField] > b[basisField]) {
        return 1;
      }
      return 0
    });
  };

  const handleFileUpload = fileList => {
    // get path
    const relativePath = fileList[0].webkitRelativePath;
    const folder = relativePath.split('/')[0];
    setFolderName(folder);

    const arr = _fileListToArr(fileList);
    const chapterArray = _sortChapters(arr);
    _sortAlphabetically(chapterArray, 'chapterKey');

    setCurrentChapterIndex(0);
    setChapters(chapterArray);
    setImages(arr);
  };

  const next = () => {
    if (currentChapterIndex < chapters.length - 1) {
      setCurrentChapterIndex(currentChapterIndex + 1)
      scrollToTop()
    }
  };

  const previous = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(currentChapterIndex - 1)
      scrollToTop()
    }
  };

  const scrollToTop = () => {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div style={{ fontFamily: 'sans-serif', margin: -8, display: 'flex', justifyContent: 'center', color: Colors.black }}>
      <div style={{ width: 516 }}> {/* main body */}
        <div style={{ padding: '58px 8px 8px', border: '1px solid grey', marginBottom: 24 }}> {/* header */}
          <div style={{ fontWeight: 'bold', fontSize: 32 }}>webtoon reader</div>
          <div>created by Ronna Firmo</div>

          <div style={{ margin: '24px 0 0' }}>Select a folder containing webtoon images to get started!</div>
        </div> {/* header */}

        <div style={{
          width: 'inherit',
          border: '1px solid grey',
          marginBottom: 8,
          position: 'sticky',
          top: 0,
          background: 'rgba(255, 255, 255, 0.95)' ,
          display: 'flex',
          flexDirection: 'column'
          }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ margin: 8 }}><b style={{ background: '#ffeb3b', padding: '0 4px' }}>{folderName || 'none selected'}</b></div>
            <div>
              <input style={{ width: 200 }} onChange={e => handleFileUpload(e.target.files)} directory="" webkitdirectory="" type="file" />
            </div>
          </div>

          {chapters.length > 0 && (
            <React.Fragment>
              {/* horizontal break */}
              <div style={{ alignSelf: 'center', backgroundColor: 'grey', height: 1, width: '97%' }} />

              <div style={{ padding: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>{chapters[currentChapterIndex].chapterKey}</div>
                <div>
                  <button onClick={scrollToTop} style={{ marginRight: 8 }}>Go up</button>
                  <button onClick={previous} style={{ marginRight: 8 }}>Previous</button>
                  <button onClick={next}>Next</button>
                </div>
              </div>
            </React.Fragment>
          )}
        </div>

        <div style={{ width: 'inherit', border: '1px solid grey' }}>
          {!chapters[currentChapterIndex] && (
            <div style={{ margin: 8, color: 'grey' }}>Your webtoon will be displayed here</div>
          )}
          {chapters[currentChapterIndex]?.images.map((file, i) => {
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
