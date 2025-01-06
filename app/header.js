// Function to create a DNS response header
function createDNSHeader(requestBuffer, responseCode = 0) {
    const header = Buffer.alloc(12);
  
    // Copy ID from request
    requestBuffer.copy(header, 0, 0, 2);
  
    // Set QR bit to 1 (response), Opcode to 0 (standard query), AA to 0 (not authoritative)
    // RD and RA to 0 (recursion not desired/available)
    let flags = 0x8000 | (responseCode & 0xF); // QR = 1 (response), AA = 0
    header.writeUInt16BE(flags, 2);
  
    // QDCOUNT (number of questions) - copy from request
    requestBuffer.copy(header, 4, 4, 6);
  
    // ANCOUNT (number of answers)
    header.writeUInt16BE(0, 6);
  
    // NSCOUNT (number of authority records)
    header.writeUInt16BE(0, 8);
  
    // ARCOUNT (number of additional records)
    header.writeUInt16BE(0, 10);
  
    return header;
  }
  
// Export the function
export default { createDNSHeader };
  