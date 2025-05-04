import { create } from "zustand";

export const useNoteStore = create((set) => ({
    notes: [],

    setNotes: (notes) => set({notes}),
    
    openEditNote: (note) => {
        set({ selectedNote: note });
        const modal = document.getElementById('my_modal_1');
        if (modal) modal.showModal();
        console.log("Edit Note", note);
      },

    fetchNotes: async () => {
        const res = await fetch("/api/notes");
        const data = await res.json();
        set({notes:data.data})
    },

    createNote: async (newNote) => {
        if(!newNote.title || newNote.type === "Type" || !newNote.content){
            return ({success:false, message:"Please Fill in All Fields"})
        }
        const res = await fetch("/api/notes",{
            method:"POST",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify(newNote)
        })
        const data = await res.json();
        set((state) => ({notes:[...state.notes, data.data]}))
        return { success:true, message:"Note created successfully"}
    },

    deleteNote: async (id) => {
        const res = await fetch(`/api/notes/${id}`,{
            method: 'DELETE'
        });
        const data = await res.json()
        if(!data.success) return{
            success:false,message:data.message
        }
        set((state) => ({
            notes: state.notes.filter(note => note._id !== id)
        }))
        return({success:true, message:data.message})
    },

    editNote: async (id, updatedNote) => {
        const res = await fetch(`/api/notes/${id}`,{
            method:"PUT",
            headers:{"Content-type":"application/json"},
            body: JSON.stringify(updatedNote)
        })
        const data = await res.json();
        if(!data.success) return {success:false, message:data.message}

        set((state) => ({
            notes: state.notes.map(note => note._id === id ? data.data : note)
        }))

        return {success:true,message:data.message}
    }
}))