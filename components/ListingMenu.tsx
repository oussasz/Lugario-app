"use client";
import React, { FC, useTransition } from "react";
import { BsThreeDots } from "react-icons/bs";
import { usePathname } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Menu from "./Menu";
import Modal from "./modals/Modal";
import ConfirmDelete from "./ConfirmDelete";
import EditListingModal from "./modals/EditListingModal";

import { deleteProperty } from "@/services/properties";
import { deleteReservation } from "@/services/reservation";

const pathNameDict: { [x: string]: string } = {
  "/properties": "Delete property",
  "/trips": "Cancel reservation",
  "/reservations": "Cancel guest reservation",
};

const normalizePathname = (pathname: string) => {
  if (!pathname) return "";
  if (pathname === "/") return "/";
  return pathname.replace(/\/+$/, "");
};

interface ListingMenuProps {
  id: string;
}

const ListingMenu: FC<ListingMenuProps> = ({ id }) => {
  const pathname = usePathname();
  const normalizedPathname = normalizePathname(pathname);
  const isHome = normalizedPathname === "/";
  const isFavorites = normalizedPathname.endsWith("/favorites");
  const isProperties = normalizedPathname.endsWith("/properties");
  const isTrips = normalizedPathname.endsWith("/trips");
  const isReservations = normalizedPathname.endsWith("/reservations");

  const deleteLabel = isProperties
    ? pathNameDict["/properties"]
    : isTrips
      ? pathNameDict["/trips"]
      : isReservations
        ? pathNameDict["/reservations"]
        : "";

  const { mutate: deleteListing } = useMutation({
    mutationFn: deleteProperty,
  });
  const { mutate: cancelReservation } = useMutation({
    mutationFn: deleteReservation,
  });
  const [isLoading, startTransition] = useTransition();

  if (isHome || isFavorites) return null;
  if (!isProperties && !isTrips && !isReservations) return null;

  const onConfirm = (onModalClose?: () => void) => {
    startTransition(() => {
      try {
        if (isProperties) {
          deleteListing(id, {
            onSuccess: () => {
              onModalClose?.();
              toast.success("Listing successfully deleted!");
            },
          });
        } else if (isTrips || isReservations) {
          cancelReservation(id, {
            onSuccess: () => {
              onModalClose?.();
              toast.success("Reservation successfully cancelled!");
            },
          });
        }
      } catch (error) {
        toast.error("Oops! Something went wrong. Please try again later.");
        onModalClose?.();
      }
    });
  };

  return (
    <Modal>
      <Menu>
        <Menu.Toggle
          id="lisiting-menu"
          className="w-10 h-10 flex items-center z-5 justify-center"
        >
          <button
            type="button"
            className="w-7 h-7 rounded-full bg-neutral-700/50 flex items-center justify-center hover:bg-neutral-700/70 group transition duration-200 z-[5]"
          >
            <BsThreeDots className="h-[18px] w-[18px] text-gray-300 transition duration-100 group-hover:text-gray-100 " />
          </button>
        </Menu.Toggle>
        <Menu.List position="bottom-left" className="rounded-md">
          {isProperties ? (
            <Modal.Trigger name="edit-listing">
              <Menu.Button className="text-[14px] rounded-md font-semibold py-[10px] hover:bg-neutral-100 transition">
                Edit property
              </Menu.Button>
            </Modal.Trigger>
          ) : null}
          <Modal.Trigger name="confirm-delete">
            <Menu.Button className="text-[14px] rounded-md font-semibold py-[10px] hover:bg-neutral-100 transition">
              {deleteLabel}
            </Menu.Button>
          </Modal.Trigger>
        </Menu.List>
      </Menu>
      {isProperties ? (
        <Modal.Window name="edit-listing">
          <EditListingModal listingId={id} />
        </Modal.Window>
      ) : null}
      <Modal.Window name="confirm-delete">
        <ConfirmDelete
          onConfirm={onConfirm}
          title={deleteLabel}
          isLoading={isLoading}
        />
      </Modal.Window>
    </Modal>
  );
};

export default ListingMenu;
