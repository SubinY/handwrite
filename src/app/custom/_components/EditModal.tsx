"use client";

import Modal from "@/components/shared/modal";
import Image from "next/image";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from "react";
import type { editItem } from "../types";
import { Button, Space } from "antd";
import { Icons } from "@/components/Icons";

export const EditModal = ({
  showModal,
  setShowModal,
  ...props
}: editItem & { showModal: boolean; setShowModal: any }) => {
  const { id, name } = props;

  return (
    <>
      <Modal showModal={showModal} setShowModal={setShowModal}>
        <div className="w-full flex overflow-hidden shadow-xl md:max-w-[50vw] md:rounded-2xl md:border md:border-gray-200">
          <div className="w-full mr-0 flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white text-center">
            <div className="heade w-full flex justify-between p-[15px] border-b-[1px]">
              <span className="text-xl">{name}</span>
              <Icons.close className="cursor-pointer" onClick={() => setShowModal(false)} />
            </div>
            <div className="content w-full">
              {/* <div
                className="imgBg w-full h-[70vh] bg-no-repeat bg-contain bg-size-cover bg-center"
                style={{ backgroundImage: `url(/imgs/A4本子.jpg)` }}
              ></div> */}
              <Image
                alt="logo"
                id="canvas_bg"
                src={"/imgs/A4本子.jpg"}
                width={300}
                height={300 * 1.414}
                style={{
                  margin: "0 auto",
                }}
              />
            </div>
            <div className="footer w-full p-[15px] text-right border-t-[1px]">
              <Space>
                <Button onClick={() => setShowModal(false)}>关闭</Button>
                <Button type="primary">创建</Button>
              </Space>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export function useEditModal() {
  const [showEditModal, setShowEditModal] = useState(false);

  const ShowEditModalCallback = useCallback(
    (props: editItem) => {
      return (
        <EditModal
          // @ts-ignore
          showModal={showEditModal}
          setShowModal={setShowEditModal}
          {...props}
        />
      );
    },
    [showEditModal, setShowEditModal]
  );

  return useMemo(
    () => ({ setShowEditModal, EditModal: ShowEditModalCallback }),
    [setShowEditModal, ShowEditModalCallback]
  );
}
