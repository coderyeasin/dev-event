"use client";
import React, { useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";

interface FormValues {
  title: string;
  description: string;
  overview: string;
  image: FileList;
  venue: string;
  location: string;
  date: string;
  time: string;
  mode: string;
  audience: string;
  agenda: { value: string }[];
  organizer: string;
  tags: { value: string }[];
}

const CreateEvent = () => {
  const [serverError, setServerError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      agenda: [{ value: "" }],
      tags: [{ value: "" }],
    },
  });

  const agendaFieldArray = useFieldArray({
    control,
    name: "agenda",
  });
  const tagsFieldArray = useFieldArray({
    control,
    name: "tags",
  });

  const onSubmit = async (data: FormValues) => {
    setServerError(null);
    setSuccess(false);
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("overview", data.overview);
      formData.append("venue", data.venue);
      formData.append("location", data.location);
      formData.append("date", data.date);
      formData.append("time", data.time);
      formData.append("mode", data.mode);
      formData.append("audience", data.audience);
      formData.append("organizer", data.organizer);
      // Arrays as JSON
      formData.append(
        "agenda",
        JSON.stringify(data.agenda.map((a) => a.value).filter(Boolean))
      );
      formData.append(
        "tags",
        JSON.stringify(data.tags.map((t) => t.value).filter(Boolean))
      );
      // File
      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]);
      }

      console.log("formData", data);

      //   const res = await fetch("/api/events", {
      //     method: "POST",
      //     body: formData,
      //   });
      //   const result = await res.json();
      //   if (!res.ok || result.status !== 201) {
      //     setServerError(result.message || "Failed to create event");
      //   } else {
      //     setSuccess(true);
      //     reset();
      //   }
    } catch (e: any) {
      setServerError(e.message || "Unknown error");
    }
  };
  const inputCommonCls =
    "w-full border-2 border-teal-900 bg-transparent outline-0 shadow-none ring-0 focus:ring-0 focus:outline-none";
  const labelCls = "block font-medium mb-3";
  return (
    <div className="min-w-3xl mx-auto px-6 py-6 bg-teal-900/30 rounded shadow">
      <h2 className="text-2xl font-bold mb-5 text-center">
        Create Upcoming Event
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        encType="multipart/form-data"
        className="space-y-4 "
      >
        <div className="w-full flex justify-around gap-5">
          <div className="6/12 space-y-3">
            <div>
              <label className={labelCls}>Title *</label>
              <input
                type="text"
                {...register("title", { required: "Title is required" })}
                className={inputCommonCls}
              />
              {errors.title && (
                <span className="text-red-500 text-sm">
                  {errors.title.message}
                </span>
              )}
            </div>
            <div>
              <label className={labelCls}>Description *</label>
              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                className={`${inputCommonCls} rounded`}
              />
              {errors.description && (
                <span className="text-red-500 text-sm">
                  {errors.description.message}
                </span>
              )}
            </div>
            <div>
              <label className={labelCls}>Overview *</label>
              <textarea
                {...register("overview", { required: "Overview is required" })}
                className={`${inputCommonCls} rounded`}
              />
              {errors.overview && (
                <span className="text-red-500 text-sm">
                  {errors.overview.message}
                </span>
              )}
            </div>
            <div>
              <label className={labelCls}>Venue *</label>
              <input
                type="text"
                {...register("venue", { required: "Venue is required" })}
                className={inputCommonCls}
              />
              {errors.venue && (
                <span className="text-red-500 text-sm">
                  {errors.venue.message}
                </span>
              )}
            </div>
            <div className="flex justify-between items-center gap-3">
              <div>
                <label className={labelCls}>Audience *</label>
                <input
                  type="text"
                  {...register("audience", {
                    required: "Audience is required",
                  })}
                  className={inputCommonCls}
                />
                {errors.audience && (
                  <span className="text-red-500 text-sm">
                    {errors.audience.message}
                  </span>
                )}
              </div>
              <div>
                <label className={labelCls}>Organizer *</label>
                <input
                  type="text"
                  {...register("organizer", {
                    required: "Organizer is required",
                  })}
                  className={inputCommonCls}
                />
                {errors.organizer && (
                  <span className="text-red-500 text-sm">
                    {errors.organizer.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex justify-between items-center gap-3">
              <div>
                <label className={labelCls}>Location *</label>
                <input
                  type="text"
                  {...register("location", {
                    required: "Location is required",
                  })}
                  className={inputCommonCls}
                />
                {errors.location && (
                  <span className="text-red-500 text-sm">
                    {errors.location.message}
                  </span>
                )}
              </div>
              <div>
                <label className={labelCls}>Image *</label>
                <input
                  type="file"
                  accept="image/*"
                  {...register("image", { required: "Image is required" })}
                  className={inputCommonCls}
                />
                {errors.image && (
                  <span className="text-red-500 text-sm">
                    {errors.image.message}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="w-6/12 space-y-3">
            <div className="flex justify-between items-center gap-3">
              <div>
                <label className={labelCls}>Date (YYYY-MM-DD) *</label>
                <input
                  type="date"
                  {...register("date", {
                    required: "Date is required",
                    pattern: {
                      value: /^\d{4}-\d{2}-\d{2}$/,
                      message: "Date must be in YYYY-MM-DD format",
                    },
                  })}
                  className={inputCommonCls}
                />
                {errors.date && (
                  <span className="text-red-500 text-sm">
                    {errors.date.message}
                  </span>
                )}
              </div>
              <div>
                <label className={labelCls}>Time (HH:mm) *</label>
                <input
                  type="time"
                  {...register("time", {
                    required: "Time is required",
                    pattern: {
                      value: /^(?:[01]\d|2[0-3]):[0-5]\d$/,
                      message: "Time must be in HH:mm format",
                    },
                  })}
                  className={inputCommonCls}
                />
                {errors.time && (
                  <span className="text-red-500 text-sm">
                    {errors.time.message}
                  </span>
                )}
              </div>
              <div>
                <label className={labelCls}>Mode *</label>
                <select
                  {...register("mode", { required: "Mode is required" })}
                  className={`${inputCommonCls} py-2 px-5 rounded`}
                >
                  <option value="in-person" className="bg-teal-900">
                    In-Person
                  </option>
                  <option value="offline" className="bg-teal-900">
                    Offline
                  </option>
                  <option value="online" className="bg-teal-900">
                    Online
                  </option>
                </select>
                {errors.mode && (
                  <span className="text-red-500 text-sm">
                    {errors.mode.message}
                  </span>
                )}
              </div>
            </div>

            {/* Agenda dynamic fields */}
            <div>
              <label className={labelCls}>Agenda *</label>
              {agendaFieldArray.fields.map((field, idx) => (
                <div key={field.id} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    {...register(`agenda.${idx}.value`, {
                      required: "Agenda item is required",
                    })}
                    className={`${inputCommonCls} flex-1`}
                  />
                  <button
                    type="button"
                    onClick={() => agendaFieldArray.remove(idx)}
                    className="bg-red-800 rounded px-2 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => agendaFieldArray.append({ value: "" })}
                className="bg-green-800 rounded px-2 py-1 cursor-pointer mt-1"
              >
                Add Agenda Item
              </button>
              {errors.agenda && (
                <span className="text-red-500 text-sm">
                  At least one agenda item is required
                </span>
              )}
            </div>
            {/* Tags dynamic fields */}
            <div>
              <label className={labelCls}>Tags *</label>
              {tagsFieldArray.fields.map((field, idx) => (
                <div key={field.id} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    {...register(`tags.${idx}.value`, {
                      required: "Tag is required",
                    })}
                    className={`${inputCommonCls} flex-1`}
                  />
                  <button
                    type="button"
                    onClick={() => tagsFieldArray.remove(idx)}
                    className="bg-red-800 rounded px-2 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => tagsFieldArray.append({ value: "" })}
                className="bg-green-800 rounded px-2 py-1 cursor-pointer mt-1"
              >
                Add Tag
              </button>
              {errors.tags && (
                <span className="text-red-500 text-sm">
                  At least one tag is required
                </span>
              )}
            </div>
          </div>
        </div>
        {serverError && (
          <div className="text-red-600 font-semibold">{serverError}</div>
        )}
        {success && (
          <div className="text-green-600 font-semibold">
            Event created successfully!
          </div>
        )}
        <button
          type="submit"
          className={`${inputCommonCls} text-xl cursor-pointer py-2 rounded-md hover:bg-teal-900/50`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : "Create Event"}
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
