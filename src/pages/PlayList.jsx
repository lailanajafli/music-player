import axios from "axios";
import React, { useEffect, useState } from "react";

const PlayList = () => {
  const [playlist, setPlaylist] = useState([]);

  const getPlaylist = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/music?s=adele"
      );
      console.log(response.data.results);
      if (response.data.results) {
        setPlaylist(response.data.results);
        console.log(playlist);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    getPlaylist();
  }, []);

  return (
    <div>
      <h1>Music Playlist</h1>
    </div>
  );
};

export default PlayList;
