import React, {useEffect, useState } from 'react';
import { Grid, Item, Image, Icon, Container } from 'semantic-ui-react';
import Topics from '../components/topics';
import firebase from '../utils/firebase'
import 'firebase/firestore';
import { getPostList } from '../api/posts'
import { Link } from 'react-router-dom';

const Post =(props: any) =>{
  const [posts, setPosts] = useState<any>()
   useEffect(()=> {
    const fetchData = async () => {
    const res = await getPostList({})
    setPosts(res?.data)
    return res?.data
    }
   fetchData()
    //  getPostList({})
    // firebase.firestore().collection('posts').get().then((collectionSnapshot) =>{
    //   const data = collectionSnapshot.docs.map(doc => {
    //     const id = doc.id
    //     return { ...doc.data(), id }
    //   })
    //   setPosts(data)
    // } 
    // )
  }, [])
  return (
    <Container>
    <Grid>
      <Grid.Row type="flex">
        <Grid.Column width={3}><Topics></Topics></Grid.Column>
        <Grid.Column width={10}><Item.Group>
          { posts?.map((post: any, index: any) => {
          return <Item key={post.id +index } as={Link} to={`/posts/${post.id}`}>
            <Item.Image src={post?.imageUrl || "https://react.semantic-ui.com/images/wireframe/image.png"}></Item.Image>
            <Item.Content>
              <Item.Meta>
                {
                  post.author.photoUrl ? <Image src={post.author.photoUrl}></Image> : <Icon name="user circle"></Icon>
                }
                {post.topic}。{post.author.displayName || "使用者"}
              </Item.Meta>
              <Item.Header>{post.title}</Item.Header>
              <Item.Description>{post.content}</Item.Description>
              <Item.Extra>
                留言 0 讚 0
              </Item.Extra>
            </Item.Content>
          </Item>
        })}
        </Item.Group></Grid.Column>
        <Grid.Column width={3}>空白</Grid.Column>
      </Grid.Row>
    </Grid>
    </Container>
  )
}

export default Post