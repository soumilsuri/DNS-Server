# DNS Header 

### Code Explanation

#### Function: `createDNSHeader`

```javascript
function createDNSHeader(requestBuffer, responseCode = 0) {
    const header = Buffer.alloc(12); // Allocate 12 bytes for the DNS header buffer
  
    // Copy ID from request
    requestBuffer.copy(header, 0, 0, 2); // Copies the Transaction ID (first 2 bytes) from the requestBuffer to the header buffer
  
    // Set QR bit to 1 (response), Opcode to 0 (standard query), AA to 0 (not authoritative)
    // RD and RA to 0 (recursion not desired/available)
    let flags = 0x8000 | (responseCode & 0xF); // QR = 1 (response), AA = 0
    header.writeUInt16BE(flags, 2); // Writes the 16-bit flags value to the header buffer at offset 2
  
    // QDCOUNT (number of questions) - copy from request
    requestBuffer.copy(header, 4, 4, 6); // Copies bytes 4-6 from the requestBuffer to the header buffer
                                         // This indicates the number of questions (typically 1 in most queries)
  
    // ANCOUNT (number of answers)
    header.writeUInt16BE(0, 6); // Writes 0 for the Answer Count field (ANCOUNT), as this server does not provide answers
  
    // NSCOUNT (number of authority records)
    header.writeUInt16BE(0, 8); // Writes 0 for the Authority Records Count field (NSCOUNT)
  
    // ARCOUNT (number of additional records)
    header.writeUInt16BE(0, 10); // Writes 0 for the Additional Records Count field (ARCOUNT)
  
    return header; // Returns the constructed DNS header buffer
}

// Export the function
export default { createDNSHeader };
```

---

### DNS Header Structure

The DNS header is always **12 bytes long** and consists of the following fields:

| Field         | Size (bytes) | Description                                                                 |
|---------------|--------------|-----------------------------------------------------------------------------|
| **ID**        | 2            | Transaction ID, copied from the query, used to match requests with responses. |
| **Flags**     | 2            | Contains control flags such as QR, Opcode, AA, RD, RA, and the response code. |
| **QDCOUNT**   | 2            | Number of questions in the query.                                           |
| **ANCOUNT**   | 2            | Number of answers in the response (set to 0 here).                          |
| **NSCOUNT**   | 2            | Number of authority records in the response (set to 0 here).                |
| **ARCOUNT**   | 2            | Number of additional records in the response (set to 0 here).               |

---

### Key Functions and Explanations

1. **`Buffer.alloc(12)`**:
   - Allocates a 12-byte buffer to store the DNS header.
   - The header is initialized with all zeroes.

2. **`requestBuffer.copy(header, 0, 0, 2)`**:
   - Copies the first 2 bytes (Transaction ID) from the incoming `requestBuffer` to the `header`.
   - This ensures the response uses the same Transaction ID as the query.

3. **Flags Construction**:
   ```javascript
   let flags = 0x8000 | (responseCode & 0xF);
   ```
   - **`0x8000`**: Sets the **QR** bit to `1`, indicating this is a response.
   - **`& 0xF`**: Ensures that the `responseCode` fits into the lower 4 bits of the flags field.

4. **`header.writeUInt16BE(flags, 2)`**:
   - Writes the 16-bit `flags` value to the header buffer at **offset 2**.
   - The flags include:
     - **QR**: 1 for response.
     - **Opcode**: 0 for standard query.
     - **AA**: 0, not authoritative.
     - **RD/RA**: 0, recursion not desired or available.

5. **`requestBuffer.copy(header, 4, 4, 6)`**:
   - Copies bytes 4–6 from the `requestBuffer` to the header.
   - This represents the **QDCOUNT** (number of questions in the query).

6. **Setting `ANCOUNT`, `NSCOUNT`, and `ARCOUNT`**:
   - **`header.writeUInt16BE(0, 6)`**: Sets **ANCOUNT** (Answer Count) to 0 because no answers are provided.
   - **`header.writeUInt16BE(0, 8)`**: Sets **NSCOUNT** (Authority Record Count) to 0.
   - **`header.writeUInt16BE(0, 10)`**: Sets **ARCOUNT** (Additional Record Count) to 0.

---

### Export Statement

```javascript
export default { createDNSHeader };
```

- Exports the `createDNSHeader` function as the **default export** of this file.
- It can be imported into other files/modules using ES6 syntax:

```javascript
import header from './header.js';
const dnsHeader = header.createDNSHeader(requestBuffer, responseCode);
```

---

### Additional Notes

- **`0x8000`**:
  - A hexadecimal value that corresponds to a 16-bit binary number: `1000000000000000`.
  - It sets the **QR** bit to 1 (indicating a response).

- **`& 0xF`**:
  - Ensures the response code is limited to the last 4 bits of the flags field.

- **Endianess in `writeUInt16BE`**:
  - `BE` stands for **Big-Endian**, meaning the most significant byte is stored first.
  - DNS protocol uses Big-Endian format for multi-byte fields.
