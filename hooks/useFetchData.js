import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

// 1. Hook untuk mengambil daftar SEMESTER
export function useSemesters() {
  const [semesters, setSemesters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSemesters() {
      try {
        setLoading(true);
        
        // Langsung tembak tabel 'semester' (lowercase)
        const { data, error } = await supabase
          .from('semester') 
          .select('*')
          .order('order', { ascending: true });

        if (error) throw error;

        setSemesters(data || []);
      } catch (err) {
        console.error("❌ Error fetch semesters:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSemesters();
  }, []);

  return { semesters, loading, error };
}

// 2. Hook untuk mengambil COURSE berdasarkan Semester ID
export function useCoursesBySemester(semesterId) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!semesterId) return;

    async function fetchCourses() {
      try {
        setLoading(true);
        
        // Langsung tembak tabel 'course' (lowercase)
        const { data, error } = await supabase
          .from('course')
          .select('*')
          .eq('semesterId', semesterId)
          .order('name', { ascending: true });

        if (error) throw error;
        
        setCourses(data || []);
      } catch (err) {
        console.error("❌ Error fetch courses:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchCourses();
  }, [semesterId]);

  return { courses, loading, error };
}

// 3. Hook untuk mengambil DETAIL COURSE + MATERIAL
export function useCourseDetail(courseId) {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!courseId) return;

    async function fetchDetail() {
      try {
        setLoading(true);
        
        // Langsung tembak tabel 'course' dan join ke 'material' (lowercase semua)
        const { data, error } = await supabase
          .from('course')
          .select(`*, materials:material(*)`) 
          .eq('id', courseId)
          .single();

        if (error) throw error;
        
        setCourse(data);

      } catch (err) {
        console.error("❌ Error fetch detail:", err.message);
        setError(err.message || 'Gagal mengambil data');
      } finally {
        setLoading(false);
      }
    }

    fetchDetail();
  }, [courseId]);

  return { course, loading, error };
}

// ... kode hook useSemesters, useCoursesBySemester, useCourseDetail sebelumnya ...

// 4. Hook untuk PENCARIAN Mata Kuliah
export function useSearchCourses() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = async (query) => {
    if (!query || query.trim() === '') {
      setResults([]);
      return;
    }

    try {
      setLoading(true);
      console.log("🔍 Mencari:", query);

      // Mencari di tabel 'course' kolom 'name' yang mengandung teks query (ilike = case insensitive)
      const { data, error } = await supabase
        .from('course')
        .select('*')
        .ilike('name', `%${query}%`)
        .limit(20); // Batasi hasil agar tidak terlalu banyak

      if (error) throw error;
      
      setResults(data || []);
    } catch (err) {
      console.error("❌ Error search:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { search, results, loading, error };
}