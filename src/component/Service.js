import axios from "axios";
export function RegisterUser(user) {
  return axios.post("http://localhost:8081/user/register", user, {
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    }
  });
}
export function LoginUser(loginData) {
  return axios.post("http://localhost:8081/user/login", loginData, {
    headers: {
      "Content-Type": "application/json;charset=utf-8"
    }
  });
}
export function forgotPassword(email) {
  return axios.post(
    "http://localhost:8081/user/forgot",
    {},
    {
      params: {
        email: email
      }
    }
  );
}

export function passwordReset(token, password) {
  return axios.post("http://localhost:8081/user/passwordReset", password, {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      token: token
    }
  });
}

export function getProfilePic(token) {
  return axios.get("http://localhost:8081/user/getProfilePic", {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      token: token
    }
  });
}

export function addNote(newNote, token) {
  console.log(`newNote` + JSON.stringify(newNote));
  console.log(`token` + token);

  return axios.post("http://localhost:8082/note/add", newNote, {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      token: token
    }
  });
}

export function getNotes(token) {
  return axios.post(
    "http://localhost:8082/note/getNotes",
    {},
    {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        token: token
      }
    }
  );
}

export function trash(noteId, token) {
  return axios.post(`http://localhost:8082/note/trash?noteId=${noteId}`, null, {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      token: token
    }
  });
}

export function editNote(noteId, note, token) {
  return axios.post(
    `http://localhost:8082/note/update?noteId=${noteId}`,
    note,
    {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        token: token
      }
    }
  );
}

export function deleteNote(noteId, token) {
  return axios.post(
    `http://localhost:8082/note/delete?noteId=${noteId}`,
    null,
    {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        token: token
      }
    }
  );
}

export function archive(noteId, token) {
  return axios.post(
    `http://localhost:8082/note/archive?noteId=${noteId}`,
    null,
    {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        token: token
      }
    }
  );
}

export function search(searchKey) {
  return axios.post(
    `http://localhost:8082/note/searchByTitle?title=${searchKey}`,
    null,
    {
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      }
    }
  );
}

export function addColor(color, noteId, token) {
  return axios.post(
    `http://localhost:8082/note/addColor`,
    {},
    {
      params: {
        color: color,
        noteId: noteId
      },
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        token: token
      }
    }
  );
}

export function addReminder(date, noteId, token) {
  return axios.get(`http://localhost:8082/note/addReminder`, {
    params: {
      date: date,
      noteId: noteId
    },
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      token: token
    }
  });
}

export function deleteReminder(noteId, token) {
  return axios.get(`http://localhost:8082/note/deleteReminder`, {
    params: {
      noteId: noteId
    },
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      token: token
    }
  });
}

export function addColaborator(noteId, userName, token) {
  return axios.post(`http://localhost:8082/note/addColaborator`,userName, {
    params: {
      noteId: noteId
    },
    headers: {
      "Content-Type": "application/json;charset=utf-8",

      token: token
    }
  });
}

export function removeColaborator(noteId, userName, token) {
  return axios.get(`http://localhost:8082/note/removeColaborator`, {
    params: {
      noteId: noteId,
      userName: userName
    },
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      token: token
    }
  });
}

export function pin(noteId, token) {
  return axios.get(`http://localhost:8082/note/pin`, {
    params: {
      noteId: noteId
    },
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      token: token
    }
  });
}

export function uploadImage(token, file) {
  return axios.post(`http://localhost:8081/user/uploadImg`, file, {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      token: token
    }
  });
}

//*******************************Label Axios*********************************/
export function getLabels(token) {
  return axios.post("http://localhost:8082/label/getlabel", null, {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      token: token
    }
  });
}

export function addLabel(label, token) {
  return axios.post("http://localhost:8082/label/add", label, {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      token: token
    }
  });
}

export function deleteLabel(labelId, token) {
  console.log(labelId);
  console.log(token);

  return axios.delete(`http://localhost:8082/label/delete?labelId=${labelId}`, {
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      token: token
    }
  });
}

export function updateLabel(labelId, label, token) {
  console.log(label);

  return axios.put("http://localhost:8082/label/update", label, {
    params: {
      labelId: labelId
    },
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      token: token
    }
  });
}

export function assignNoteToLabel(noteId, labelId, token) {
  return axios.post(
    "http://localhost:8082/label/assignNote",
    {},
    {
      params: {
        noteId: noteId,
        labelId: labelId
      },
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        token: token
      }
    }
  );
}

export function deleteNoteFromLabel(noteId, labelId, token) {
  return axios.post(
    "http://localhost:8082/label/deleteNote",
    {},
    {
      params: {
        noteId: noteId,
        labelId: labelId
      },
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        token: token
      }
    }
  );
}

export function getNoteByLabelId(labelId, token) {
  console.log(labelId);
  console.log(token);

  return axios.post(
    "http://localhost:8082/label/getNotes",
    {},
    {
      params: {
        labelId: labelId
      },
      headers: {
        "Content-Type": "application/json;charset=utf-8",
        token: token
      }
    }
  );
}
