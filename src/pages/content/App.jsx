import { useEffect, useState } from "react";
import TemplateGroupPopup from "../../components/TemplateGroupPopup";
import { fetchGroups, fetchTemplate } from "../../utils/api";
import ModalWrapper from "../../components/ModalWrapper";
import VariableInputContainer from "../../components/VariableInputContainer";
import { applyTemplate, extractVariables } from "../../utils/templateVariable";

export default function IconButton({ emailEditorId }) {
  const [showPopup, setShowPopup] = useState(false);
  const [templateGroups, setTemplateGroups] = useState([]);
  const textColor = showPopup ? "text-primary" : "text-gray-600";

  const serachTemplate = async (templateName) => {
    const groups = await fetchGroups(templateName);
    setTemplateGroups(groups);
  };

  useEffect(() => {
    serachTemplate();
  }, []);

  const handleIconButtonClick = () => {
    setShowPopup(!showPopup);
  };

  const [showModal, setShowModal] = useState(false);
  const [template, setTemplate] = useState({});
  const [templateVariables, setTemplateVariables] = useState({});

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleTemplateSelect = async (templateId) => {
    if (!templateId) return;

    setShowPopup(false);

    const result = await fetchTemplate(templateId);
    setTemplate(result);

    const variables = extractVariables(result);

    if (Object.keys(variables).length > 0) {
      setTemplateVariables(variables);
      openModal();
    } else {
      applyTemplate(emailEditorId, result);
    }
  };

  const handleInput = (name, value) => {
    setTemplateVariables({
      ...templateVariables,
      [name]: value,
    });
  };

  const handleVariableApply = () => {
    let { body } = template;
    let { subject } = template;

    Object.keys(templateVariables).forEach((key) => {
      const regex = new RegExp(`\\[\\{${key}\\}\\]`, "g");
      body = body.replace(regex, templateVariables[key]);
      subject = subject.replace(regex, templateVariables[key]);
    });

    const templateData = template;
    templateData.body = body;
    templateData.subject = subject;

    applyTemplate(emailEditorId, templateData);
    setTemplate({});
    closeModal();
  };

  return (
    <>
      <button
        className={`flex justify-center ml-2.5 cursor-pointer ${textColor} hover:text-primary`}
        data-tooltip="Glerk 템플릿 추가"
        aria-label="Glerk 템플릿 추가"
        onClick={handleIconButtonClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          width="16"
          height="16"
        >
          <path d="M21.41,5h-4.41V.59l4.41,4.41Zm-5.41,13H8v-6h8v6Zm6-11V24H2V3C2,1.34,3.34,0,5,0H15V7h7Zm-16,0h5v-2H6v2Zm12,3H6v10h12V10Z" />
        </svg>
      </button>
      {showPopup && (
        <TemplateGroupPopup
          templateGroups={templateGroups}
          serachTemplate={serachTemplate}
          handleTemplateSelect={handleTemplateSelect}
        />
      )}
      {showModal && (
        <ModalWrapper onModalClose={closeModal}>
          <VariableInputContainer
            variables={templateVariables}
            handleInput={handleInput}
            ApplyVariable={handleVariableApply}
          />
        </ModalWrapper>
      )}
    </>
  );
}
