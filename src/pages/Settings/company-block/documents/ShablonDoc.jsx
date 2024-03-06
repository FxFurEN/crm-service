import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useDispatch, useSelector } from 'react-redux';
import { setDocumentContent, selectDocumentContent } from '@store/visibilitySlice';
import { PrintProvider, Print, NoPrint } from 'react-easy-print';
import { Button, Flex, Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined, FileOutlined } from '@ant-design/icons';

const ShablonDoc = () => {
    const dispatch = useDispatch();
    const documentContent = useSelector(selectDocumentContent);
    const editorRef = useRef(null);

    const handleSave = (content) => {
        dispatch(setDocumentContent(content));
    };

    const handlePrint = () => {
        if (editorRef.current) {
            editorRef.current.editor.execCommand('mcePrint');
        }
    };

    const baseStyle = {
        width: 'clamp(300px, 100%, 500px)',
        height: 50,
    };

    const buttonIconStyle = {
        fontSize: 20,
        margin: 'auto', 
    };

    return (
        <main id='main'>
            <Flex wrap="wrap" gap="large">
                <PrintProvider>
                    <Print printDialogOptions={{ printBackground: true }}>
                        <Editor
                            ref={editorRef}
                            initialValue={documentContent}
                            tinymceScriptSrc={'/tinymce/tinymce.min.js'}
                            init={{
                                selector: 'textarea#file-picker',
                                promotion: false,
                                statusbar: false,
                                height: 700,
                                toolbar_mode: 'wrap',
                                menubar: 'edit insert format table',
                                menu: {
                                    edit: { title: 'Edit', items: 'undo redo | cut copy paste pastetext | selectall | searchreplace' },
                                    insert: { title: 'Insert', items: 'image link media addcomment pageembed template codesample inserttable | charmap emoticons hr | pagebreak nonbreaking anchor tableofcontents | insertdatetime' },
                                    format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript codeformat | styles blocks fontfamily fontsize align lineheight | forecolor backcolor | language | removeformat' },
                                    tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | a11ycheck code wordcount' },
                                    table: { title: 'Table', items: 'inserttable | cell row column | advtablesort | tableprops deletetable' },
                                },
                                plugins: [
                                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                    'insertdatetime', 'media', 'table', 'preview', 'help', 'wordcount', 'save'
                                ],
                                toolbar: 'save | undo redo | blocks | ' +
                                    'bold italic forecolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat ',
                                save_onsavecallback: (editor) => {
                                    handleSave(editor.getContent());
                                },
                                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                            }}
                        />
                    </Print>
                </PrintProvider>
                <NoPrint>
                    <Flex horizontal gap="small" >
                        <Button style={{ ...baseStyle }} type='primary' >Сохранить</Button>
                        <Button style={{ ...baseStyle }}>Отмена</Button>
                        <Tooltip title="Редактировать">
                            <Button style={{ ...baseStyle }} type='primary' shape='circle' icon={<EditOutlined style={buttonIconStyle} />} />
                        </Tooltip>
                        <Tooltip title="Удалить">
                            <Button style={{ ...baseStyle }} type='primary' shape='circle' icon={<DeleteOutlined style={buttonIconStyle} />} />
                        </Tooltip>
                        <Tooltip title="Предпросмотр">
                            <Button style={{ ...baseStyle }} onClick={handlePrint} type='primary' shape='circle' icon={<FileOutlined style={buttonIconStyle} />} />
                        </Tooltip>
                    </Flex>
                </NoPrint>
            </Flex>
        </main>
    );
};

export default ShablonDoc;
