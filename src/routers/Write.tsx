import { useMutation, useQuery } from "@tanstack/react-query";
import "@toast-ui/editor/dist/toastui-editor.css";

import { Editor } from "@toast-ui/react-editor";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { getContents, postContents } from "../api";
import { toDoState } from "../atom";

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 60px);
  top: 60px;
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

interface IContents {
  id: number;
  categoryIndex: number;
  part: string;
  topic: string;
  contents: any;
  commentCounts: number;
}

export function Write() {
  const editorRef = useRef<any>(null);
  const posting = editorRef.current?.getInstance().getMarkdown();
  const { contentId } = useParams();
  console.log(contentId);
  const { isLoading: contentLoading, data: contentData } = useQuery<IContents>(
    ["content", contentId],
    () => getContents(contentId)
  );

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
      contentId,
      posting: { ...contentData, contents: posting },
    });
    // 입력창에 입력한 내용을 MarkDown 형태로 취득
  };

  return (
    <Container>
      <Editor
        height="100%"
        ref={editorRef}
        placeholder="내용을 입력해주세요."
        previewStyle="vertical"
        initialEditType="wysiwyg"
        initialValue={contentData && contentData.contents}
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
      <Submit type="button" onClick={handleRegisterButton}>
        등록
      </Submit>
    </Container>
  );
}
