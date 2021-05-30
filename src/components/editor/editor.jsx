import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import ListErrors from '../errors/ListErrors';
import agent from '../../agent';
import { connect } from 'react-redux';
import {
  EDITOR_PAGE_LOADED,
  ARTICLE_SUBMITTED,
  EDITOR_PAGE_UNLOADED
} from '../../constants/actionTypes';
import {EditorPage, Container, Caption, Form} from './style.js';
import Button from '../button';
import CustomInput from '../input';
import TextArea from '../text-area';
import Tag from '../tag';

const mapStateToProps = state => ({
  ...state.editor
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: EDITOR_PAGE_LOADED, payload }),
  onSubmit: payload =>
    dispatch({ type: ARTICLE_SUBMITTED, payload }),
  onUnload: () =>
    dispatch({ type: EDITOR_PAGE_UNLOADED })
});

function Editor(props) {
  const {onSubmit, onLoad, onUnload, match,
    articleSlug, errors} = props;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [body, setBody] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tagList, setTagList] = useState([]);
  const [imageFileName, setImageFileName] = useState('');
  const [imageFileData, setImageFileData] = useState({});
  const [image, setImage] = useState('null');
  const [imageRef, setImageRef] = useState(useRef(null));

  const changeTitle = function(ev) {
    setTitle(ev.target.value);
  };
  const changeDescription = function(ev) {
    setDescription(ev.target.value);
  };
  const changeBody = function(ev) {
    setBody(ev.target.value);
  };
  const changeTagInput = function(ev) {
    setTagInput(ev.target.value);
  };
  const changeFileInput = function(ev) {
    if (ev.target.files[0]) {
      setImageFileName(ev.target.value);
      const FR = new FileReader();
      FR.addEventListener("load", function(e) {
        setImageFileData(e.target.result.split(',')[1]);
      });
      FR.readAsDataURL(ev.target.files[0]);
    }
  };  

  const removeTagHandler = tag => () => {
    setTagList([...tagList.filter((item) => item !== tag)]);
  };

  const submitForm = ev => {    
    ev.preventDefault();
    if (ev.target.tagName === "SPAN") {      
      const tags = tagInput.split(',').filter(tag => tag !== "");
      const article = {
        title,
        description,
        body,
        tagList: tags,
        image: imageFileName ? {
          name: imageFileName,
          data: imageFileData,
          contentType: 'image/png'
        } : undefined
      };
  
      const slug = { slug: articleSlug };
      const promise = articleSlug ?
        agent.Articles.update(Object.assign(article, slug)) :
        agent.Articles.create(article);
  
      onSubmit(promise);
    }
  };

  useEffect(() => {
    if (match.params.slug) {
      onLoad(agent.Articles.get(match.params.slug));
    }
    onLoad(null);
    return () => {
      onUnload();
    };
  }, [match]);

  useEffect(() => {
    setTitle(props.title || '');
    setDescription(props.description || '');
    setBody(props.body || '');
    setTagList(props.tagList || '');
    setImage(props.image ? props.image.img : '');
    if (props.image && image !== props.image.img && imageRef && imageRef.current && props.image && props.image.img) {
      
      const convertBase64ToFile = function (image) {
        const byteString = atob(image);
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i += 1) {
          ia[i] = byteString.charCodeAt(i);
        }
        const newBlob = new Blob([ab], {
          type: 'image/png',
        });
        return newBlob;
      };      
      
      const file = new File([convertBase64ToFile(props.image.img)], props.image.name, {type: 'image/png'});
      var dt = new DataTransfer();
      dt.items.add(file);
      const file_list = dt.files;
      setImageRef({...imageRef, files: file_list});
    }
  }, [props]);

  return (
    <EditorPage>
      <Container>
        <ListErrors errors={errors}></ListErrors>
        <Caption className="text text_type_main-large mt-4 mb-4">Новая запись</Caption>
        <Form>
          <CustomInput              
            className="mb-6"
            placeholder="Название статьи"
            size="default"
            value={title}
            onChange={changeTitle} />

          <CustomInput              
            className="mb-6"
            placeholder="О чем статья"
            size="default"
            value={description}
            onChange={changeDescription} />

          <CustomInput              
            className="mb-6"
            placeholder="Изображение (опционально)"
            type="file"
            size="default"
            inputRef={imageRef}
            value={imageFileName}
            onChange={changeFileInput} />

          <TextArea              
            className="mb-6"
            placeholder="Текст статьи"
            size="default"
            value={body}
            onChange={changeBody} />

          <CustomInput              
            className="mb-6"
            placeholder="Тэги (через запятую)"
            size="default"
            value={tagInput}
            onChange={changeTagInput} />

          {tagList.length > 0 && <div style={{display: 'flex', justifyContent: 'flex-start'}}              
            className="mb-6">
            {
              (tagList || []).map(tag => {
                return (
                  <Tag active={true} remove={true} key={tag} caption={tag} onDelete={removeTagHandler(tag)}/>
                );
              })
            }
          </div>}
          
          <div style={{display: 'flex', justifyContent: 'flex-end'}}              
            className="mb-6">
            <Button
              caption="Опубликовать статью"
              onClick={submitForm}
            />
          </div>
          
        </Form>
      </Container>
    </EditorPage>
  );
}

Editor.propTypes = {
  onSubmit: PropTypes.func,
  onLoad: PropTypes.func,
  onUnload: PropTypes.func,
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string.isRequired
    })
  }),
  articleSlug: PropTypes.string,
  errors: PropTypes.object,
  title: PropTypes.string,
  description: PropTypes.string,
  body: PropTypes.string,
  tagList: PropTypes.arrayOf(PropTypes.string),
  image: PropTypes.string,
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
