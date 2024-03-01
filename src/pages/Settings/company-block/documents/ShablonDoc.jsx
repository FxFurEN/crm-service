import { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';

const ShablonDoc = () => {
    const [content, setContent] = useState('');

    useEffect(() => {
        const savedContent = localStorage.getItem('savedContent');
        if (savedContent) {
            setContent(savedContent);
        }
    }, []);

    const handleSave = (content) => {
        localStorage.setItem('savedContent', content);
        console.log('Document saved');
    };

    return (
        <main id='main' style={{ color: 'black' }}>
            <Editor
                initialValue={content}
                tinymceScriptSrc={'/tinymce/tinymce.min.js'}
                init={{
                    selector: 'textarea#file-picker',
                    promotion: false,
                    statusbar: false,
                    height: 700,
                    menubar: true,
                    file_picker_types: 'image',
                    link_title: false,
                    plugins: [
                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                        'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount', 'save'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                        'bold italic forecolor | alignleft aligncenter ' +
                        'alignright alignjustify | bullist numlist outdent indent | ' +
                        'removeformat save',
                    file_picker_callback: (cb, value, meta) => {
                        const input = document.createElement('input');
                        input.setAttribute('type', 'file');
                        input.setAttribute('accept', 'image/*');
                    
                        input.addEventListener('change', (e) => {
                          const file = e.target.files[0];
                          const reader = new FileReader();
                          reader.addEventListener('load', () => {
                            const id = 'blobid' + (new Date()).getTime();
                            const blobCache =  tinymce.activeEditor.editorUpload.blobCache;
                            const base64 = reader.result.split(',')[1];
                            const blobInfo = blobCache.create(id, file, base64);
                            blobCache.add(blobInfo);
                            cb(blobInfo.blobUri(), { title: file.name });
                          });
                          reader.readAsDataURL(file);
                        });
                    
                        input.click();
                      },
                    save_onsavecallback: (editor) => {
                        handleSave(editor.getContent());
                    },
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                }}
            />
        </main>
    );
};

export default ShablonDoc;
