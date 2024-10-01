export interface Author{
  successful: boolean,
  result: [{
    name: string,
    id: string
  }
]
}

export interface Authors{
  successful: boolean,
  result: [{
    name: string,
    id: string
  }
]
}

export interface AuthorResponse {
    successful: boolean;  // Correct type for 'successful'
    result: { id: string; name: string }[];
}

export interface CourseResponse {
  successful: boolean;
  result: {
    title: string;
    description: string;
    creationDate: string;
    duration: number;
    authors: string[];
    id: string;
  };
}
