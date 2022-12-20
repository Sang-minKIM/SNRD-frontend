import { useMutation } from "@tanstack/react-query";
import "@toast-ui/editor/dist/toastui-editor.css";
import S3 from "react-aws-s3-typescript";
import { v4 as uuidv4 } from "uuid";
import { Editor } from "@toast-ui/react-editor";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import styled from "styled-components";
import { postContents } from "../api";

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 50px);
  top: 50px;
  position: fixed;
`;

const Submit = styled.button`
  position: absolute;
  top: 3px;
  right: 10px;
  width: 83px;
  height: 38px;
  background-color: ${(props) => props.theme.navy};
  border: none;
  border-radius: 6px;
  color: ${(props) => props.theme.white.lighter};
`;

const Cancel = styled(Submit)`
  right: 103px;
`;

interface IContents {
  id: number;
  categoryIndex: number;
  part: string;
  topic: string;
  contents: any;
  commentCounts: number;
}

window.Buffer = window.Buffer || require("buffer").Buffer;

export function Write() {
  const navigate = useNavigate();
  const editorRef = useRef<any>(null);
  const posting = editorRef.current?.getInstance().getMarkdown();
  const { contentId } = useParams();

  // const { isLoading: contentLoading, data: contentData } = useQuery<IContents>(
  //   ["content", contentId],
  //   () => getContents(contentId)
  // );
  const location = useLocation();
  const { projectId, topic, category, contentData } = location.state;
  console.log("location", location);
  console.log("contentData", contentData);

  const postMutation = useMutation(postContents, {
    onMutate: (variable) => {
      const posting = editorRef.current?.getInstance().getMarkdown();
      console.log("onMutate", variable, posting);
      return posting;
      // variable : {loginId: 'xxx', password; 'xxx'}
    },
    onSuccess: (data, variables, context) => {
      console.log("success", data, variables, context);
    },
  });

  const handleRegisterButton = () => {
    postMutation.mutate({
      projectId,
      id: contentId,
      topic,
      category,
      contents: posting,
    });
    // 입력창에 입력한 내용을 MarkDown 형태로 취득
  };
  // s3에 image 업로드하기
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.getInstance().removeHook("addImageBlobHook");
      //addImageBlobHook 삭제, 커스텀훅 추가
      editorRef.current
        .getInstance()
        .addHook(
          "addImageBlobHook",
          (blob: any, callback: (arg0: any, arg1: string) => any) => {
            const s3config = {
              bucketName: process.env.REACT_APP_BUCKET_NAME as string,
              region: process.env.REACT_APP_REGION as string,
              accessKeyId: process.env.REACT_APP_ACCESS_ID as string,
              secretAccessKey: process.env.REACT_APP_ACCESS_KEY as string,
            };
            const ReactS3Client = new S3(s3config);
            ReactS3Client.uploadFile(blob, uuidv4())
              .then((data) => callback(data.location, "imageURL"))
              .catch((err) => (window.location.href = "/error"));
          }
        );
    }
  }, []);

  return (
    <Container>
      <Editor
        height="100%"
        ref={editorRef}
        placeholder="내용을 입력해주세요."
        previewStyle="vertical"
        initialEditType="wysiwyg"
        initialValue={contentData && contentData}
        toolbarItems={[
          // 툴바 옵션 설정
          ["heading", "bold", "italic", "strike"],
          ["hr", "quote"],
          ["ul", "ol", "task", "indent", "outdent"],
          ["table", "image", "link"],
          ["code", "codeblock"],
        ]}
        useCommandShortcut={false} // 키보드 입력 컨트롤 방지
      />
      <Cancel type="button" onClick={() => navigate(-1)}>
        편집 취소
      </Cancel>
      <Submit type="button" onClick={handleRegisterButton}>
        등록
      </Submit>
    </Container>
  );
}
