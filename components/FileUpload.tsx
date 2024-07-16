'use client';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import { useEffect, useState } from 'react';

// Import the plugin code
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import axios from 'axios';

// Register the plugin
registerPlugin(FilePondPluginFileValidateType, FilePondPluginFileValidateSize);

interface FileUploadProps {
  setParsedText: (text: string) => void;
}


export default function FileUpload({ setParsedText }: FileUploadProps) {
  const [files, setFiles] = useState<any[]>([]);

  useEffect(() => {
    if (files.length === 0) {
      setParsedText("");
    }
  }, [files, setParsedText]);

  const handleProcess = (error: any, file: any) => {
    // if (error) {
    //   console.error('Error processing file:', error);
    //   return;
    // }

    // const reader = new FileReader();
    // reader.onload = async () => {
    //   const text = reader.result as string;
    //   setExtractedText(text); 
    // };
    // reader.readAsText(file.file); 
  };


  return (
    <FilePond
      files={files}
      onupdatefiles={fileItems => {
        setFiles(fileItems.map(fileItem => fileItem.file));
        // setUploadedFile(fileItems.length ? fileItems[0].file as File : null);
      }}
      onprocessfile={handleProcess}
      acceptedFileTypes={['application/pdf']}
      maxFiles={1}
      allowMultiple={false}
      server={{
        // process: '/api/resume-data',
        process: async () => {
          const response = await axios.post('/api/resume-data',{files})
          console.log({response})
          if(response && response.status===200) console.log({response:response.data})
        },
        fetch: null,
        revert: null, 
      }}
      name="filepond"
      labelIdle='Drag & Drop your PDF or <span class="filepond--label-action">Browse</span>'
    /> 
  );
}
