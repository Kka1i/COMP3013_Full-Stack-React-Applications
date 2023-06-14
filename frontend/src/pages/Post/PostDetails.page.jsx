import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { Container, Grid, SimpleGrid, useMantineTheme, rem } from '@mantine/core';
import DOMAIN from "../../services/endpoint";
import axios from "axios";
const PRIMARY_COL_HEIGHT = rem(300);

function PostDetailsPage() {
  const theme = useMantineTheme();
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - ${theme.spacing.md} / 2)`;

  const data = useLoaderData();
  
  const postId = Number(window.location.pathname.slice(-1)) - 1;

  const currentUserId = JSON.parse(localStorage.getItem('user')).id;

  const currentImgUserId = data['posts'].data[postId].userId;

  const currentImgUserEmail = data['users'].data[currentImgUserId - 1].email;

  const currentImgUserName = currentImgUserEmail.substring(0, currentImgUserEmail.indexOf('@'));

  const [isEditing, setIsEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(data['posts'].data[postId].title);
  const [updatedCategory, setUpdatedCategory] = useState(data['posts'].data[postId].category);
  const [updatedContent, setUpdatedContent] = useState(data['posts'].data[postId].content);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleUpdateClick = () => {
    // Update the fields locally
    data['posts'].data[postId].title = updatedTitle;
    data['posts'].data[postId].category = updatedCategory;
    data['posts'].data[postId].content = updatedContent;
    setIsEditing(false);
  };

  return (
    <Container my="md">
      <SimpleGrid cols={2} spacing="md" breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        <img src={data['posts'].data[postId].image } style={{ borderRadius: "10px", width: "300px" }}/>
        <Grid gutter="md">
          <Grid.Col>
              <p>{currentImgUserName}</p>
          </Grid.Col>
          <Grid.Col>
            {isEditing ? (
              <input
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
              />
            ) : (
              <p>{data['posts'].data[postId].title}</p>
            )}
          </Grid.Col>
          <Grid.Col>
            {isEditing ? (
              <input
                type="text"
                value={updatedCategory}
                onChange={(e) => setUpdatedCategory(e.target.value)}
              />
            ) : (
              <p>{data['posts'].data[postId].category}</p>
            )}
          </Grid.Col>
          <Grid.Col>
            {isEditing ? (
              <textarea
                value={updatedContent}
                onChange={(e) => setUpdatedContent(e.target.value)}
              />
            ) : (
              <p>{data['posts'].data[postId].content}</p>
            )}
          </Grid.Col>
          <Grid.Col>
            {currentImgUserId === currentUserId ? (
              isEditing ? (
                <button onClick={handleUpdateClick}>Update</button>
              ) : (
                <button onClick={handleEditClick}>Edit</button>
              )
            ) : null}
          </Grid.Col>
        </Grid>
      </SimpleGrid>
    </Container>
  );
}

export const postDetailsLoader = async () => {
  // do something with this
  const res1 = await axios.get(`${DOMAIN}/api/posts/`);
  const res2 = await axios.get(`${DOMAIN}/api/users/`);
  const dataGroup = {
    posts: res1,
    users: res2
  };
  return dataGroup;
};

export default PostDetailsPage;
