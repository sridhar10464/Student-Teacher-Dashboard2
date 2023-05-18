import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Layout, Menu, Breadcrumb } from 'antd';
import { HomeOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import './App.css';

import StudentList from './components/StudentList';
import AddStudentForm from './components/AddStudentForm';
import TeacherList from './components/TeacherList';
import AddTeacherForm from './components/AddTeacherForm';
import Dashboard from './components/Dashboard';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem('students')) || [];
    const storedTeachers = JSON.parse(localStorage.getItem('teachers')) || [];

    setStudents(storedStudents);
    setTeachers(storedTeachers);
  }, []);

  useEffect(() => {
    localStorage.setItem('students', JSON.stringify(students));
    localStorage.setItem('teachers', JSON.stringify(teachers));
  }, [students, teachers]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const addStudent = (newStudent) => {
    setStudents([...students, newStudent]);
  };

  const deleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  const addTeacher = (newTeacher) => {
    setTeachers([...teachers, newTeacher]);
  };

  const deleteTeacher = (id) => {
    setTeachers(teachers.filter((teacher) => teacher.id !== id));
  };

  return (
    <BrowserRouter>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapsed}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<HomeOutlined />}>
              <Link to="/">Home</Link>
            </Menu.Item>
            <SubMenu key="sub1" icon={<UserOutlined />} title="Students">
              <Menu.Item key="2">
                <Link to="/students">List</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/students/add">Add New</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<VideoCameraOutlined />} title="Teachers">
              <Menu.Item key="4">
                <Link to="/teachers">List</Link>
              </Menu.Item>
              <Menu.Item key="5">
                <Link to="/teachers/add">Add New</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>Student</Breadcrumb.Item>
              <Breadcrumb.Item>Teacher</Breadcrumb.Item>
            </Breadcrumb>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <Routes>
                <Route exact path="/" element={<Dashboard />} />
                  
                <Route exact path="/students" element={<StudentList students={students} deleteStudent={deleteStudent} />} />
                  
                <Route exact path="/students/add" element={<AddStudentForm addStudent={addStudent} />} />
                  
                <Route exact path="/teachers" element={<TeacherList teachers={teachers} deleteTeacher={deleteTeacher} />} />
                  
                <Route exact path="/teachers/add" element={<AddTeacherForm addTeacher={addTeacher} />} />
              </Routes>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Admin Dashboard ©2023 Created by Sri</Footer>
        </Layout>
      </Layout>
    </BrowserRouter>
  );
}

export default App;