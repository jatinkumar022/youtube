import React, { useState } from "react";

import Container from "../../components/common/Container";
import PlaylistCard from "../../components/common/PlaylistCard";
import { GoPlus } from "react-icons/go";
import PlaylistModal from "../../components/common/Modals/PlaylistModal";
const PlaylistComponent = ({ playlist, getPlaylists }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Track modal open state

  const closeModal = () => {
    setIsModalOpen(false); // Close modal
  };
  return (
    <>
      <div className="flex items-center justify-between pr-5">
        <h1 className="text-3xl px-4 pt-5 font-semibold text-gray-800 dark:text-gray-100 mb-6">
          Your Playlists
        </h1>
        <button
          className="dark:hover:bg-[#272727] text-[#aaa] rounded-full w-10 h-10 flex items-center justify-center"
          onClick={() => setIsModalOpen(true)}
        >
          <GoPlus size={35} className="" />
        </button>
      </div>
      <PlaylistModal
        getPlaylists={getPlaylists}
        open={isModalOpen}
        closeModal={closeModal}
      />
      <Container>
        {playlist?.map((item, index) => (
          <PlaylistCard key={index} item={item} />
        ))}
      </Container>
    </>
  );
};

export default PlaylistComponent;
