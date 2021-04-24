import {Container, Flex, Spinner, VStack} from "@chakra-ui/core";
import React, {useEffect, useState} from "react";
import Post from "./components/post";
import Navbar from "./components/navbar";
import db from "./lib/firebase";


const App = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    db.collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((querySnapshot) => {
        const _posts = [];

        querySnapshot.forEach((doc) => {
          _posts.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        setPosts(_posts);
      });
  }, []);

  useEffect(() => {
    //hook to handle the initial fetcing of the posts
    db.collection("posts")
      .orderBy("createdAt", "desc")
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPosts(data);
      });
  }, []);


  return (
    <>
      <Navbar />
      <Container maxW="md" centerContent p={8}>
        <VStack spacing={8} w="100%">
          {posts.map((post) => (
            <Post post={post} key={posts.id} />
          ))}
        </VStack>
      </Container>
    </>
  );
}

export default App;
