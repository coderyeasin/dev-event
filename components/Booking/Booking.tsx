import React from "react";

interface BookingType {
  _id: string;
  email: string;
  eventId: string;
}

const BookingHome = ({ booking }: { booking: BookingType[] }) => {
  return (
    <section>
      <h3 className="text-2xl text-center font-bold py-5">
        Event Booked : {booking.length}
      </h3>
      <div className="flex flex-wrap justify-center items-center gap-5 mask-linear-from-95%">
        {booking.map((item: BookingType) => {
          return (
            <div
              key={item._id}
              className="bg-teal-900/25 w-80 h-32 rounded-2xl p-3 flex justify-center items-center"
            >
              <p>
                Confirmed E-mail: <br /> {item.email}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BookingHome;
