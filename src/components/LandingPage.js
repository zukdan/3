import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

const LandingPageContainer = styled.div`
  text-align: center;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2.5em;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 1.2em;
  margin-bottom: 30px;
`;

const AppButton = styled.a`
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1.2em;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background-color: #367C39;
  }
`;

const InfoSection = styled.div`
  text-align: left;
  margin-top: 40px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const InfoTitle = styled.h2`
  font-size: 1.5em;
  margin-bottom: 15px;
`;

const InfoParagraph = styled.p`
  font-size: 1.1em;
  line-height: 1.6;
`;

const ContactForm = styled.form`
  text-align: left;
  margin-top: 40px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box; /* Important! */
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box; /* Important! */
  resize: vertical;
`;

const FileInput = styled.input`
  padding: 8px 0;
`;

const SubmitButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const CreatorInfo = styled.div`
  margin-top: 50px;
  font-size: 0.9em;
  color: #777;
`;

function LandingPage() {
  const [formData, setFormData] = useState({
      fio: '',
      organization: '',
      email: '',
      message: '',
      file: null,
  });

  const handleChange = (e) => {
      const { name, value, type, files } = e.target;
      setFormData(prevData => ({
          ...prevData,
          [name]: type === 'file' ? files[0] : value,
      }));
  };

  const handleSubmit = async (e) => {
      e.preventDefault();

      const formDataToSend = new FormData();
      formDataToSend.append('fio', formData.fio);
      formDataToSend.append('organization', formData.organization);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('message', formData.message);
      if (formData.file) {
          formDataToSend.append('file', formData.file, formData.file.name);
      }

      try {
          const response = await axios.post('http://localhost:5000/send-email', formDataToSend, {
              headers: {
                  'Content-Type': 'multipart/form-data'
              }
          });

          console.log(response.data);
          alert('Сообщение успешно отправлено!');

          setFormData({
              fio: '',
              organization: '',
              email: '',
              message: '',
              file: null,
          });
      } catch (error) {
          console.error('Ошибка при отправке:', error);
          alert('Ошибка при отправке сообщения.');
      }
  };

  return (
    <LandingPageContainer>
      <Title>Добро пожаловать 👋</Title>
      <Description>
        Это сайт создан для помощи в визуализации и формировании образовательной программы по направлению "Информационная безопастность"
      </Description>

      <AppButton
          as="a"
          href="/app" 
          target="_blank"
          rel="noopener noreferrer"
      >
        Перейти к веб приложению для визуализации и формирования образовательной программы по направлению "Информационная безопастность"
      </AppButton>
      
      <InfoSection>
        <InfoTitle>Обязательные требования для создания образовательной программы:</InfoTitle>
        <InfoParagraph>
          Не стоит забывать , что образовательная программа разрабатывается с учетом следующих аспектов:
        </InfoParagraph>
        <InfoParagraph>
          <b>1. Соответствие стандартам:</b> Программа основывается на ФГОС (Федеральный государственный образовательный стандарт), определяющем требования к знаниям и умениям выпускника, профстандартах (для профессионального образования) и локальных актах учебного заведения.
        </InfoParagraph>
        <InfoParagraph>
          <b>2. Профиль подготовки и цели:</b> Учитывается профиль подготовки (например, педагог, инженер, врач), определяются основные цели обучения, включая компетенции, знания и навыки, которые должен получить студент.
        </InfoParagraph>
        <InfoParagraph>
          <b>3. Учебный план:</b> Разрабатывается учебный план, включающий перечень дисциплин, модулей и их объем в часах/кредитах, а также график учебного процесса с последовательностью изучения предметов, каникулами и практикой. Программы дисциплин (рабочие программы) содержат подробное содержание каждого предмета и формы контроля.
        </InfoParagraph>
        <InfoParagraph>
          <b>4. Воспитательная работа:</b> Программа включает раздел воспитательной работы, отражающий мероприятия по гражданско-патриотическому, духовно-нравственному, экологическому воспитанию, волонтёрскую и проектную деятельность, психолого-педагогическое сопровождение студентов и сотрудничество с родителями и социальными партнёрами.
        </InfoParagraph>
        <InfoParagraph>
          <b>5. Апробация и утверждение:</b> Программа обсуждается на методических советах, утверждается директором или ректором учреждения и может проходить внешнюю экспертизу (например, аккредитацию или общественное обсуждение).
        </InfoParagraph>

      </InfoSection>

      <ContactForm onSubmit={handleSubmit}>
                <Label htmlFor="fio">Если вы уже сделали или у вас есть предложения изменения нынешней образовательно программы можите заполнить и отправить эту форму</Label>
                <FormGroup>
                    <Label htmlFor="fio">ФИО:</Label>
                    <Input
                        type="text"
                        id="fio"
                        name="fio"
                        value={formData.fio}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="organization">Название организации:</Label>
                    <Input
                        type="text"
                        id="organization"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="email">Ваш email:</Label>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        rows="4"
                        required 
                        />
                </FormGroup>
                <FormGroup>
          <Label htmlFor="message">Сообщение:</Label>
          <TextArea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            required
          />
        </FormGroup> 
                <FormGroup>
                    <Label htmlFor="file">Прикрепить файл с образовательной программой (JSON):</Label>
                    <FileInput
                        type="file"
                        id="file"
                        name="file"
                        accept=".json"
                        onChange={handleChange}
                    />
                </FormGroup>
                <SubmitButton type="submit">Отправить</SubmitButton>
            </ContactForm>

            <CreatorInfo>
                Разработано студентом БФУ направления "Информационная безопасность" : Зульфикаровым Данилом Муратовичем <br />
                Email: obrazovatelnaiprogramm@gmail.com<br />
                GitHub: <a href="https://github.com/zukdan" target="_blank" rel="noopener noreferrer">zukdan</a><br />
            </CreatorInfo>
        </LandingPageContainer>
    );
}

export default LandingPage;