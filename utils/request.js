import React from 'react';

  const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

// Fetch all pros

async function fetchPros() {
  try {
    // handle case where apiDomain not available

    if (!apiDomain) {
      return [];
    }
    const res = await fetch(`${apiDomain}/professionals`,);

    if (!res.ok) {
      throw new Error('Failed to fetch Data');
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

// Fetch single pro

async function fetchPro(id) {
  try {
    // handle case where apiDomain not available

    if (!apiDomain) {
      return null;
    }
    const res = await fetch(`${apiDomain}/professionals/${id}`);

    if (!res.ok) {
      throw new Error('Failed to fetch Data');
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function fetchJob(id) {
  try {
    // handle case where apiDomain not available

    if (!apiDomain) {
      return null;
    }

    const res = await fetch(`${apiDomain}/jobs/${id}`);

    if (!res.ok) {
      throw new Error('Failed to fetch Data');
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}
async function fetchLead(id) {
  try {
    // handle case where apiDomain not available

    if (!apiDomain) {
      return null;
    }

    const res = await fetch(`${apiDomain}/leads/${id}`);

    if (!res.ok) {
      throw new Error('Failed to fetch Data');
    }

    return res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export { fetchPros, fetchPro, fetchJob, fetchLead };
