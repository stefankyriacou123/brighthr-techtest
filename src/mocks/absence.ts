import { http, HttpResponse } from 'msw'

import type { Absence } from '../types'
import { BASE_API_URL } from '../constants'

export const absenceList: Absence[] = [
  {
      "id": 0,
      "startDate": "2022-05-28T04:39:06.470Z",
      "days": 9,
      "absenceType": "SICKNESS",
      "employee": {
          "firstName": "Rahaf",
          "lastName": "Deckard",
          "id": "2ea05a52-4e31-450d-bbc4-5a6c73167d17"
      },
      "approved": true
  },
  {
      "id": 1,
      "startDate": "2022-02-08T08:02:47.543Z",
      "days": 5,
      "absenceType": "ANNUAL_LEAVE",
      "employee": {
          "firstName": "Enya",
          "lastName": "Behm",
          "id": "84502153-69e6-4561-b2de-8f21f97530d3"
      },
      "approved": true
  },
  {
      "id": 2,
      "startDate": "2020-12-31T03:08:19.146Z",
      "days": 18,
      "absenceType": "ANNUAL_LEAVE",
      "employee": {
          "firstName": "Amiah",
          "lastName": "Fenton",
          "id": "6ebff517-f398-4d23-9ed3-a0f14bfa3858"
      },
      "approved": true
  },
  {
      "id": 3,
      "startDate": "2022-01-01T13:12:13.562Z",
      "days": 14,
      "absenceType": "ANNUAL_LEAVE",
      "employee": {
          "firstName": "Jabez",
          "lastName": "Nasser",
          "id": "24a9352b-cf35-4e00-b4c9-403546d7bea8"
      },
      "approved": true
  },
  {
      "id": 4,
      "startDate": "2023-05-08T07:46:20.745Z",
      "days": 1,
      "absenceType": "ANNUAL_LEAVE",
      "employee": {
          "firstName": "Jabez",
          "lastName": "Nasser",
          "id": "24a9352b-cf35-4e00-b4c9-403546d7bea8"
      },
      "approved": true
  },
  {
      "id": 5,
      "startDate": "2020-03-31T06:15:23.316Z",
      "days": 3,
      "absenceType": "ANNUAL_LEAVE",
      "employee": {
          "firstName": "Alexi",
          "lastName": "Schramm",
          "id": "8be1c549-fb91-4c8f-9cfe-5b5c017f26bf"
      },
      "approved": true
  },
  {
      "id": 6,
      "startDate": "2020-09-09T18:07:33.524Z",
      "days": 17,
      "absenceType": "ANNUAL_LEAVE",
      "employee": {
          "firstName": "Josemaria",
          "lastName": "Embrey",
          "id": "6dc958b7-0aea-45d6-b4cc-ce384815dc17"
      },
      "approved": true
  },
  {
      "id": 7,
      "startDate": "2021-10-19T06:48:24.862Z",
      "days": 0,
      "absenceType": "ANNUAL_LEAVE",
      "employee": {
          "firstName": "Alexi",
          "lastName": "Schramm",
          "id": "8be1c549-fb91-4c8f-9cfe-5b5c017f26bf"
      },
      "approved": true
  },
  {
      "id": 8,
      "startDate": "2020-12-24T04:37:16.129Z",
      "days": 13,
      "absenceType": "ANNUAL_LEAVE",
      "employee": {
          "firstName": "Amiah",
          "lastName": "Fenton",
          "id": "6ebff517-f398-4d23-9ed3-a0f14bfa3858"
      },
      "approved": true
  },
  {
      "id": 9,
      "startDate": "2023-06-08T13:11:47.739Z",
      "days": 10,
      "absenceType": "ANNUAL_LEAVE",
      "employee": {
          "firstName": "Amiah",
          "lastName": "Fenton",
          "id": "6ebff517-f398-4d23-9ed3-a0f14bfa3858"
      },
      "approved": true
  },
  {
      "id": 10,
      "startDate": "2020-04-19T03:02:11.615Z",
      "days": 13,
      "absenceType": "ANNUAL_LEAVE",
      "employee": {
          "firstName": "Raniya",
          "lastName": "Otte",
          "id": "e10058e4-3383-466b-91d8-1ea5bf1acf0f"
      },
      "approved": false
  },
  {
      "id": 11,
      "startDate": "2020-05-08T12:26:41.895Z",
      "days": 19,
      "absenceType": "ANNUAL_LEAVE",
      "employee": {
          "firstName": "Shrey",
          "lastName": "Frederickson",
          "id": "303aacc8-e587-4801-929a-ad7ce933ee03"
      },
      "approved": true
  },
  {
      "id": 12,
      "startDate": "2020-06-11T02:01:41.069Z",
      "days": 0,
      "absenceType": "ANNUAL_LEAVE",
      "employee": {
          "firstName": "Wesley",
          "lastName": "Alvey",
          "id": "3c2d82f1-660e-44ec-b25a-756baa6d0155"
      },
      "approved": true
  },
  {
      "id": 13,
      "startDate": "2023-08-07T05:25:37.579Z",
      "days": 1,
      "absenceType": "ANNUAL_LEAVE",
      "employee": {
          "firstName": "Shrey",
          "lastName": "Frederickson",
          "id": "303aacc8-e587-4801-929a-ad7ce933ee03"
      },
      "approved": true
  },
  {
      "id": 14,
      "startDate": "2022-10-29T07:10:52.050Z",
      "days": 3,
      "absenceType": "ANNUAL_LEAVE",
      "employee": {
          "firstName": "Josemaria",
          "lastName": "Embrey",
          "id": "6dc958b7-0aea-45d6-b4cc-ce384815dc17"
      },
      "approved": true
  },
  {
      "id": 15,
      "startDate": "2023-12-25T14:19:38.910Z",
      "days": 11,
      "absenceType": "MEDICAL",
      "employee": {
          "firstName": "Reuben",
          "lastName": "Keene",
          "id": "8c6d90a5-6636-46f9-93de-daa172b7496f"
      },
      "approved": true
  },
  {
      "id": 16,
      "startDate": "2021-05-07T06:59:09.969Z",
      "days": 12,
      "absenceType": "ANNUAL_LEAVE",
      "employee": {
          "firstName": "Raniya",
          "lastName": "Otte",
          "id": "e10058e4-3383-466b-91d8-1ea5bf1acf0f"
      },
      "approved": true
  },
  {
      "id": 17,
      "startDate": "2021-10-19T02:08:37.566Z",
      "days": 17,
      "absenceType": "ANNUAL_LEAVE",
      "employee": {
          "firstName": "Ryland",
          "lastName": "Sears",
          "id": "6ed7cc5b-4a79-4802-a002-7918efc2d416"
      },
      "approved": true
  },
  {
      "id": 18,
      "startDate": "2021-09-22T23:31:08.633Z",
      "days": 11,
      "absenceType": "ANNUAL_LEAVE",
      "employee": {
          "firstName": "Isla",
          "lastName": "Watts",
          "id": "08335a8f-1b4f-4d9b-82a8-46fa20d48f2d"
      },
      "approved": true
  },
  {
      "id": 19,
      "startDate": "2021-04-02T17:30:46.989Z",
      "days": 16,
      "absenceType": "SICKNESS",
      "employee": {
          "firstName": "Isla",
          "lastName": "Watts",
          "id": "08335a8f-1b4f-4d9b-82a8-46fa20d48f2d"
      },
      "approved": true
  }
]

export const compiledConflictResponses = [
  { conflicts: false },
  { conflicts: false },
  { conflicts: false },
  { conflicts: false },
  { conflicts: true },
  { conflicts: false },
  { conflicts: false },
  { conflicts: false },
  { conflicts: false },
  { conflicts: false },
  { conflicts: false },
  { conflicts: false },
  { conflicts: false },
  { conflicts: false },
  { conflicts: false },
  { conflicts: false },
  { conflicts: false },
  { conflicts: false },
  { conflicts: false },
  { conflicts: false },
]

const conflictHandlers = compiledConflictResponses.map((response, index) =>
  http.get(`${BASE_API_URL}/conflict/${index}`, () => HttpResponse.json(response)
))

export const handlers = [
  http.get(`${BASE_API_URL}/absences`, () => HttpResponse.json(absenceList)),
  ...conflictHandlers,
]
