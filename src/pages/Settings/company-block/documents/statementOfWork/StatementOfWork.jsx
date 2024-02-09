import '../../../../../../assets/styles/global.css';
import '../../../../../../assets/styles/main.css';
import { Editor } from '@tinymce/tinymce-react';

const StatementOfWork = () =>{
    return(
        <main id='main' style={{color: 'black'}}>
           <Editor
                apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
               
                init={{
                    plugins: 'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
                    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                    tinycomments_mode: 'embedded',
                    tinycomments_author: 'Author name',
                    language: 'ru',
                    mergetags_list: [
                    { value: 'First.Name', title: 'First Name' },
                    { value: 'Email', title: 'Email' },
                    ],
                    ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
                }}
                initialValue="Welcome to TinyMCE!"
            />          
        </main>
    )
}
export default StatementOfWork;