import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { ScrollArea } from "../ui/scroll-area";
import { Globe, MapPinHouse, Phone } from "lucide-react";
import { Restaurant } from "src/slices/restaurantsSlice";
import { hygieneRating } from "src/assets";

interface RestaurantInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  info: Restaurant;
}

export default function RestaurantInfoModal({
  isOpen,
  onClose,
  info,
}: RestaurantInfoModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[560px] p-[1px] rounded-sm">
        <DialogHeader className="p-3 bg-white border-b">
          <DialogTitle className="text-lg text-center font-semibold">
            Info
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[80vh]">
          <div className="pb-2 bg-white">
            <section>
              <div className="bg-gray-100 border border-gray-200 px-4 py-5">
                <h2 className="text-2xl font-bold">About {info.name}</h2>
              </div>
              <p className="text-gray-600 text-sm px-4 py-5">{info.tag_line}</p>
            </section>

            <section>
              <div className="bg-gray-100 border border-gray-200 px-4 py-5">
                <h2 className="text-xl font-bold">Allergens</h2>
              </div>
              <p className="mb-2 text-gray-600 text-sm mx-4 py-5 border-b border-gray-200">
                You can call {info.name} to ask about their ingredients and
                allergen information, production or cooking methods.
              </p>
              <div className="flex items-center justify-start ml-4 text-teal-500 py-3 mb-2">
                <Phone className="w-5 h-5 mr-2" />
                <a
                  href={`tel:${info.contact_number}`}
                  className="hover:underline"
                >
                  Call {info.name} on {info.contact_number}
                </a>
              </div>
            </section>

            <section>
              <div className="bg-gray-100 border border-gray-200 px-4 py-5">
                <h2 className="text-xl font-bold">Hygiene rating</h2>
              </div>

              <img
                src={hygieneRating}
                alt={`Food Hygiene Rating: ${info.hygiene_rating}`}
                width={200}
                height={100}
                className="my-4 h-[80px] w-auto mx-auto"
              />
              <p className="mb-1 text-gray-600 text-sm mx-4 pt-5 ">
                The Food Standards Agency updates food hygiene ratings
                regularly. Visit the FSA's website to see the most recent rating
                for this partner.
              </p>
              <p className="text-gray-600 text-sm mx-4 pb-5 border-b border-gray-200 mt-1">
                Last updated: 06 Oct 2024
              </p>
              <div className="flex items-center justify-start text-teal-500 py-3 mb-2 ml-4">
                <Globe className="w-5 h-5 mr-2" />
                <a href="./" className=" hover:underline inline-block">
                  View hygiene rating
                </a>
              </div>
            </section>

            <section>
              <div className="bg-gray-100 border border-gray-200 px-4 py-5">
                <h2 className="text-xl font-bold">Location</h2>
              </div>
              <img
                src="https://developers.google.com/static/maps/images/landing/hero_geocoding_api.png"
                alt="Restaurant location map"
                width={400}
                height={200}
                className="mb-2 mt-4 mx-auto rounded-md"
              />
              <p className="mb-2 text-gray-600 text-sm mx-4 py-5 border-b border-gray-200">
                {info.address}
              </p>
              <div className="flex items-center justify-start ml-4 text-teal-500 py-3 mb-2">
                <MapPinHouse className="w-5 h-5 mr-2" />
                <a
                  href="./"
                  className="text-teal-600 hover:underline mt-2 inline-block"
                >
                  View map
                </a>
              </div>
            </section>

            <section>
              <div className="bg-gray-100 border border-gray-200 px-4 py-5">
                <h2 className="text-xl font-bold">Notes</h2>
              </div>
              <p className="mb-5 text-gray-600 text-sm mx-4 pt-5 ">
                {info.notes}
              </p>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
