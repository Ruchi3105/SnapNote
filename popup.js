// Function to display saved highlights and notes
function displayHighlights() {
  chrome.storage.local.get({ highlights: [] }, function(result) {
    const notesContainer = document.getElementById('notes');
    notesContainer.innerHTML = '';
    result.highlights.forEach(function(note, index) {
      const div = document.createElement('div');
      div.className = 'note';

      // Display note content
      const contentSpan = document.createElement('p');
      contentSpan.textContent = note;
      contentSpan.className = 'note-content';
      div.appendChild(contentSpan);

      // Add edit button
      const editButton = document.createElement('span');
      editButton.textContent = 'Edit';
      editButton.className = 'edit-button';
      editButton.addEventListener('click', function() {
        editHighlight(index, contentSpan);
      });
      div.appendChild(editButton);

      // Add delete button
      const deleteButton = document.createElement('span');
      deleteButton.textContent = 'Delete';
      deleteButton.className = 'delete-button';
      deleteButton.addEventListener('click', function() {
        deleteHighlight(index);
      });
      div.appendChild(deleteButton);

      notesContainer.appendChild(div);
    });
  });
}

// Function to edit a highlight by index
function editHighlight(index, contentSpan) {
  const newText = prompt("Edit your note:", contentSpan.textContent);
  if (newText !== null) {
    contentSpan.textContent = newText;
    chrome.storage.local.get({ highlights: [] }, function(result) {
      const highlights = result.highlights;
      highlights[index] = newText;
      chrome.storage.local.set({ highlights }, function() {
        // Optionally, notify the user or update UI
      });
    });
  }
}

// Function to delete a highlight by index
function deleteHighlight(index) {
  chrome.storage.local.get({ highlights: [] }, function(result) {
    const highlights = result.highlights;
    highlights.splice(index, 1); // Remove highlight at index
    chrome.storage.local.set({ highlights }, function() {
      displayHighlights(); // Refresh highlights display
    });
  });
}

// Function to add a new note
function addNote() {
  const input = document.getElementById('newNoteInput');
  const newNote = input.value.trim();
  if (newNote !== '') {
    chrome.storage.local.get({ highlights: [] }, function(result) {
      const highlights = result.highlights;
      highlights.push(newNote);
      chrome.storage.local.set({ highlights }, function() {
        input.value = ''; // Clear input field
        displayHighlights(); // Refresh highlights display
      });
    });
  } else {
    alert('Please enter a note.');
  }
}

// Attach event listener to the Add Note button
document.getElementById('addNoteBtn').addEventListener('click', addNote);

// Attach event listener to the highlight button
document.addEventListener('DOMContentLoaded', displayHighlights);
